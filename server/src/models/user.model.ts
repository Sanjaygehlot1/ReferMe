import mongoose, { Schema, Document } from "mongoose";
import bcrypt from 'bcrypt'
import jwt, { type SignOptions } from 'jsonwebtoken'

const userSchema = new Schema({
    name: {
        type: String,
        req: true
    },
    email: {
        type: String,
        req: true,
        unique: true
    },
    password: {
        type: String,
        req: true
    },
    refreshToken: {
        type: String,
        req: true,
        select: false
    },
    referCode: {
        type: String
    }
}, { timestamps: true })

userSchema.pre("save", async function (this: any, next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

userSchema.methods.generateAccessToken =  function (this : any) {

    const expiresIn = (process.env.ACCESSTOKEN_EXPIRY as SignOptions["expiresIn"]) || "15m";

    return jwt.sign({
        id: this._id,
        email: this.email,
        name: this.fullname,
    },
        process.env.ACCESSTOKEN_SECRET as string,
        { expiresIn }
    ) as string
}
userSchema.methods.generateRefreshToken =  function (this: any) {

    const expiresIn = (process.env.REFRESHTOKEN_EXPIRY as SignOptions["expiresIn"]) || "2d";

    return jwt.sign({
        id: this._id
    },
        process.env.REFRESHTOKEN_SECRET as string,
        { expiresIn }
    ) as string
}

export const userModel = mongoose.model("User", userSchema);







