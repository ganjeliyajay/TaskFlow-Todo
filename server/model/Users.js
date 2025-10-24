import { model, Schema } from "mongoose";

export const $User = model(
    'user', Schema({
        name: { type: String, required: true },
        email: { type: String, required: true, uniqe: true },
        password: { type: String, required: true },
        conpass: { type: String, required: true },
        verifyOtp: { type: String, default: '' },
        expireOtp: { type: Number, default: 0 },
        expireResetOtp: { type: Number, default: 0 },
        isActive: { type: Boolean, default: false },
        createdAt: { type: Date, default: Date.now }
    })
)