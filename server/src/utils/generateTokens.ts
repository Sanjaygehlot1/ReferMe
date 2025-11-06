import type mongoose from "mongoose"
import { userModel } from "../models/user.model.ts"
import { ApiError } from "./ApiError.ts"
import type { Document } from "mongoose"

interface extendedUser extends Document {
    generateAccessToken(): string,
    generateRefreshToken(): string,
    refreshToken: string
}

export const GenerateRefreshAndAccessToken = async (userId: mongoose.Types.ObjectId) => {
    try {
        const user: extendedUser | null = await userModel.findById(userId)

        if (!user) {
            throw new ApiError(401, "No User Found")
        }

        const AccessToken = await user.generateAccessToken()
        const RefreshToken = await user.generateRefreshToken()


        user.refreshToken = RefreshToken
        await user.save({ validateBeforeSave: true })

        return { AccessToken, RefreshToken }
    } catch (error: any) {
        throw new ApiError(500, error.message)
    }
}