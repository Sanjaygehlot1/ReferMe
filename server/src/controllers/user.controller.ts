import type { Request, Response, NextFunction, CookieOptions } from "express"
import { userModel } from "../models/user.model.ts";
import { ApiResponse } from "../utils/ApiResponse.ts";
import { ApiError } from "../utils/ApiError.ts";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { envConfig } from "../../config/env.ts";
import { referModel } from "../models/refer.model.ts";
import { generateReferralCode } from "../utils/referCodeGenerator.ts";
import { GenerateRefreshAndAccessToken } from "../utils/generateTokens.ts";


export const signUpUser = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const { name, email, password, referCode } = req.body;

        if (!name || !email || !password) {
            throw new Error("All field required")

        }

        const existingUser = await userModel.findOne({ email })
        console.log(existingUser)

        if (existingUser) {
            res.status(409).json(new ApiResponse(409, "user with this email already exists", {}))
            return
        }

        const userReferCode = generateReferralCode(name)

        const user = await userModel.create({
            name,
            email,
            password,
            referCode: userReferCode
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

            const refer = await referModel.create({
                referal_sender: referal_sender._id,
                referal_receiver: user._id
            })

            if (!refer) {
                throw new ApiError(401, "Error refering user!")
            }
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
        console.log(existingUser)

        const isPassValid = bcrypt.compareSync(password, existingUser.password!)

        if (!isPassValid) {
            throw new ApiError(401, "Incorrect Password!")
        }

        const { AccessToken, RefreshToken } = await GenerateRefreshAndAccessToken(existingUser._id)

        const cookieOptions: CookieOptions = {
            httpOnly: true,
            sameSite: "lax",
            secure: false
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

        const existingUser = await userModel.findOne({ _id: user.id }).select('-password -refreshToken')

        if (!existingUser) {
            throw new ApiError(401, "No user exists")
        }

        console.log(existingUser)

        res.status(200).json(new ApiResponse(200, "user profile fetched", existingUser))

    } catch (error) {
        console.log(error)
        next(error)
    }
} 