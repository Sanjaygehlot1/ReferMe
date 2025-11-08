import mongoose, { Schema } from "mongoose";
import bcrypt from 'bcryptjs'
import jwt, { type SignOptions } from 'jsonwebtoken'

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim : true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim : true,
        lowercase : true
    },
    password: {
        type: String,
        required: true
    },
    refreshToken: {
        type: String,
        select: false
    },
    referCode: {
        type: String
    },
    referCount: {
        type: Number,
        default: 0,
    },
    converted: {
        type: Number,
        default: 0
    },
    credits: {
        type: Number,
        default: 0
    },
    isInvited : {
        type : Boolean,
        default : false
    },
    invitedBy: {
        type : String,
        default : null
    },
    referredUsers: [{ type: Schema.Types.ObjectId, ref: "User" }]
}, { timestamps: true })

userSchema.pre("save", async function (this: any, next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

userSchema.methods.generateAccessToken = function (this: any) {

    const expiresIn = (process.env.ACCESSTOKEN_EXPIRY as SignOptions["expiresIn"]) || "15m";

    return jwt.sign({
        id: this._id,
        email: this.email,
        name: this.name,
    },
        process.env.ACCESSTOKEN_SECRET as string,
        { expiresIn }
    ) as string
}
userSchema.methods.generateRefreshToken = function (this: any) {

    const expiresIn = (process.env.REFRESHTOKEN_EXPIRY as SignOptions["expiresIn"]) || "2d";

    return jwt.sign({
        id: this._id
    },
        process.env.REFRESHTOKEN_SECRET as string,
        { expiresIn }
    ) as string
}

export const userModel = mongoose.model("User", userSchema);







