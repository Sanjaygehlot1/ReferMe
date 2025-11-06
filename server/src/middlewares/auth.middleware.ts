import type { Request, Response, NextFunction } from "express"
import { ApiError } from "../utils/ApiError.ts"
import jwt from 'jsonwebtoken'
import type { JWTPayload } from "../../types/express.js"


export const AuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies?.accessToken

        if (!token) {
            throw new ApiError(401, "Unauthorized Access")
        }

        const user = jwt.verify(token, process.env.ACCESSTOKEN_SECRET as string) as JWTPayload

        req.user = user
        next()

    } catch (error: any) {
        console.log(error)
        next(error);
    }

}