import type { Request, Response, NextFunction } from "express"
import { ApiError } from "../utils/ApiError.ts"
import jwt from 'jsonwebtoken'
import { envConfig } from "../../config/env.ts"

interface userReq extends Request {
    user: any
}

export const AuthMiddleware = (req: userReq, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies?.token

        if (!token) {
            throw new ApiError(401, "Unauthorized Access")
        }

        const user = jwt.verify(token, envConfig.JWT_SECRET!)

        req.user = user
        next()

    } catch (error: any) {
        console.log(error)
        next(new ApiError(500, "Internal Server Error during authentication"));
    }

}