import mongoose, { model, Schema } from "mongoose";

export const $task = model(
    'task', Schema({
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
        title: String,
        description: String,
        status: { type: String,enum: ["todo", "processing", "completed"], default: "todo" },
        createdAt: { type: Date, default: Date.now }
    })
)