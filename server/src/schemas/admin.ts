import mongoose from 'mongoose';

const adminsSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: true
    },
    adminId: {
        type: Number,
        required: true,
        unique: true
    },
    tokenVersion: {
        type: Number,
        default: 0
    }
})

export default mongoose.model('Admin', adminsSchema);