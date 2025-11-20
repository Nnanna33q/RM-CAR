import mongoose from "mongoose";

export const Email = mongoose.model('Email', new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    }
}))