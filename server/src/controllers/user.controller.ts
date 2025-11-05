import type { Request, Response, NextFunction } from "express"
import { userModel } from "../models/user.model.ts";
import { ApiResponse } from "../utils/ApiResponse.ts";

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

        if (existingUser){
            res.status(409).json(new ApiResponse(409, "user with this email already exists", {}))
            return
        }

        const user = await userModel.create({
            name,
            email,
            password,
            ...(referCode && {referCode})
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