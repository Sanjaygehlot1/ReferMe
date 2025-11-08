import mongoose, { Schema } from "mongoose";

const referSchema = new Schema({
    referal_sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref : "User",
        req: true
    },
    referal_receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref : "User",
        req: true
    },
    claimed: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

export const referModel = mongoose.model("Refer", referSchema)

