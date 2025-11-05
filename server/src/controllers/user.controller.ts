import type { Request, Response, NextFunction, CookieOptions } from "express"
import { userModel } from "../models/user.model.ts";
import { ApiResponse } from "../utils/ApiResponse.ts";
import { ApiError } from "../utils/ApiError.ts";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { envConfig } from "../../config/env.ts";

export const signUpUser = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const { name, email, password, referCode } = req.body;

        if (!name || !email || !password) {
            throw new Error("All field required")

        }

        const existingUser = await userModel.findOne({
            email
        })
        console.log(existingUser)

        if (existingUser) {
            res.status(409).json(new ApiResponse(409, "user with this email already exists", {}))
            return
        }

        const user = await userModel.create({
            name,
            email,
            password,
            ...(referCode && { referCode })
        })


        if (!user) {
            throw new Error("Error registering user!")
        }

        res
            .status(201)
            .json(new ApiResponse(201, "user registration successful", user))

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
            throw new ApiError(401, "Invalid Password!")
        }

        const token = jwt.sign(
            {
                _id: existingUser._id.toString(),
                email: existingUser.email,
                name: existingUser.name
            },
            envConfig.JWT_SECRET as string
        )

        const cookieOptions: CookieOptions = {
            httpOnly: true,
            sameSite: "none",
            secure: false
        }


        res.status(200).cookie("token", token, cookieOptions).json(new ApiResponse(200, "user login successful", {
            email: existingUser.email,
            name: existingUser.name,
        }))

    } catch (error) {
        console.log(error)
        next(error)
    }
} 