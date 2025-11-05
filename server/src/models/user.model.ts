import mongoose, { Schema, Document } from "mongoose";
import bcrypt from 'bcrypt'
const userSchema = new Schema({
    name: {
        type: String,
        req: true
    },
    email: {
        type: String,
        req: true,
        unique : true
    },
    password: {
        type: String,
        req: true
    },
    accessToken: {
        type: String,
        req: true,
        select : false
    },
    refreshToken: {
        type: String,
        req: true,
        select : false
    },
    referCode: {
        type: String
    }
},{timestamps : true})

export const userModel = mongoose.model("User", userSchema);


userSchema.pre("save", async function (this: any, next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});




