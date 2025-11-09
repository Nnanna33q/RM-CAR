import mongoose from "mongoose";

const enquirySchema = new mongoose.Schema({
    name: {
        type: String,
        unique: false,
        required: true
    },
    email: {
        type: String,
        unique: false,
        required: true
    },
    message: {
        type: String,
        unique: false,
        required: true
    },
    createdAt: {
        type: Date,
        unique: false,
        required: true
    },
    status: {
        type: String,
        unique: false,
        default: 'Pending'
    }
})

export default mongoose.model('Enquiry', enquirySchema);