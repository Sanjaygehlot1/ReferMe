import type { Request, Response, NextFunction, CookieOptions } from "express"
import { userModel } from "../models/user.model.ts";
import { ApiResponse } from "../utils/ApiResponse.ts";
import { ApiError } from "../utils/ApiError.ts";
import bcrypt from 'bcryptjs'
import { referModel } from "../models/refer.model.ts";
import { generateReferralCode } from "../utils/referCodeGenerator.ts";
import { GenerateRefreshAndAccessToken } from "../utils/generateTokens.ts";
import mongoose from "mongoose";


export const signUpUser = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const { name, email, password, referCode } = req.body;

        if (!name || !email || !password) {
            throw new Error("All field required")

        }

        const existingUser = await userModel.findOne({ email })

        if (existingUser) {
            res.status(409).json(new ApiResponse(409, "user with this email already exists", {}))
            return
        }

        const userReferCode = generateReferralCode(name)

        const user = await userModel.create({
            name,
            email,
            password,
            referCode: userReferCode,

        })

        if (!user) {
            throw new ApiError(401, "Error registering user!")
        }



        if (referCode) {
            const referal_sender = await userModel.findOne({ referCode })

            if (!referal_sender) {
                await userModel.deleteOne({ _id: user._id })
                throw new ApiError(409, "Invalid referal code")
            }

            if (referal_sender._id.equals(user._id)) {
                await userModel.deleteOne({ _id: user._id })
                throw new ApiError(409, "You cannot use your own referral code");
            }

            const existing = await referModel.findOne({ referal_receiver: user._id })


            if (existing) {
                await userModel.deleteOne({ _id: user._id })
                throw new ApiError(409, "This user has already been referred");
            }

            const refer = await referModel.create({
                referal_sender: referal_sender._id,
                referal_receiver: user._id
            })


            if (!refer) {
                throw new ApiError(401, "Error refering user!")
            }

            user.isInvited = true;
            user.invitedBy = referal_sender.name
            await user.save();

            const newUser = await userModel.findByIdAndUpdate(referal_sender._id,
                {
                    $inc: { referCount: 1 },
                    $push: { referredUsers: user._id }
                },
                { new: true }
            )
        }
        res
            .status(201)
            .json(new ApiResponse(201, "user registration successful", {
                email: user.email,
                name: user.name
            }))

        return;

    } catch (error) {
        console.log(error)
        next(error)
    }

}

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            throw new ApiError(400, "Email and password required for successful login.")
        }

        const existingUser = await userModel.findOne({ email })

        if (!existingUser) {
            throw new ApiError(401, "No user exist with this email")
        }

        const isPassValid = bcrypt.compareSync(password, existingUser.password!)

        if (!isPassValid) {
            throw new ApiError(401, "Incorrect Password!")
        }

        const { AccessToken, RefreshToken } = await GenerateRefreshAndAccessToken(existingUser._id)

        const cookieOptions: CookieOptions = {
            httpOnly: true,
            sameSite: "none",
            secure: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
            path: '/'
            
        }


        res.status(200).cookie("accessToken", AccessToken, cookieOptions).cookie("refreshToken", RefreshToken, cookieOptions).json(new ApiResponse(200, "user login successful", {
            email: existingUser.email,
            name: existingUser.name,
        }))

    } catch (error) {
        console.log(error)
        next(error)
    }
}

export const getProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req.user

        if (!user) {
            throw new ApiError(401, "Unauthorized Access!")
        }

        const existingUser = await userModel.aggregate([
            { $match: { _id: new mongoose.Types.ObjectId(user.id) } },

            {
                $lookup: {
                    from: "users",
                    localField: "referredUsers",
                    foreignField: "_id",
                    as: "referred"
                }
            },

            {
                $lookup: {
                    from: "refers",
                    localField: "referredUsers",
                    foreignField: "referal_receiver",
                    as: "referralData"
                }
            },

            {
                $project: {
                    name: 1,
                    email: 1,
                    referCode: 1,
                    referCount: 1,
                    converted: 1,
                    credits: 1,
                    invitedBy : 1,
                    referred: {
                        $map: {
                            input: "$referred",
                            as: "u",
                            in: {
                                _id: "$$u._id",
                                name: "$$u.name",
                                email: "$$u.email",
                                credits: "$$u.credits",
                                createdAt: "$$u.createdAt",
                                status: {
                                    $cond: [
                                        {
                                            $in: [
                                                "$$u._id",
                                                {
                                                    $map: {
                                                        input: "$referralData",
                                                        as: "r",
                                                        in: {
                                                            $cond: ["$$r.claimed", "$$r.referal_receiver", null]
                                                        }
                                                    }
                                                }
                                            ]
                                        },
                                        true, false
                                    ]
                                }
                            }
                        }
                    }
                }
            }
        ]
        )

        if (!existingUser) {
            throw new ApiError(401, "No user exists")
        }


        res.status(200).json(new ApiResponse(200, "user profile fetched", existingUser))

    } catch (error) {
        console.log(error)
        next(error)
    }
}

export const logOutUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req.user

        if (!user) {
            throw new ApiError(401, "Unauthorized Access!")
        }

        res.status(200).clearCookie('accessToken', { path: '/' }).clearCookie('refreshToken', { path: '/' }).json(new ApiResponse(200, "Logout Successful", {}))
    } catch (error) {
        console.log(error)
        next(error)
    }
}

export const buyProductSimulation = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req.user;

        if (!user) {
            throw new ApiError(401, "Error: Unauthorized Access")
        }

        const currentUser = await userModel.findById(user.id)

        if (!currentUser) {
            throw new ApiError(401, "user not found")
        }
        let creditsEarned = 0

        if (currentUser.isInvited) {
            const exisitigReferral = await referModel.findOne({ referal_receiver: user.id })

            if (!exisitigReferral) {
                throw new ApiError(409, "referal not found")
            }



            if (!exisitigReferral.claimed) {
                exisitigReferral.claimed = true
                exisitigReferral.save()

                const sender = await userModel.findByIdAndUpdate(exisitigReferral.referal_sender, {
                    $inc: { credits: 2, converted: 1 },

                })

                if (!sender) {
                    throw new ApiError(409, "Failed to reward credits to sender!")
                }

                creditsEarned = + 2

                const receiver = await userModel.findByIdAndUpdate(user.id, {
                    $inc: { credits: 2 }
                })

                if (!receiver) {
                    throw new ApiError(409, "Failed to reward credits to receiver!")
                }

            }
        }

        res.status(200).json(new ApiResponse(200, "Product bought successfully", { creditsEarned }))



    } catch (error) {
        console.log(error)
        next(error)
    }
} 