import mongoose from "mongoose";

const BusinessInfoSchema = new mongoose.Schema({
    name: {
        type: String,
        default: 'rm-car-sales'
    },
    email: String,
    phone: String,
    instagramProfileLink: String,
    facebookProfileLink: String,
    tiktokProfileLink: String,
    logo: {
        type: String,
        required: true
    },
    publicId: {
        type: String,
        required: true
    }
})

export default mongoose.model('Business Info', BusinessInfoSchema);