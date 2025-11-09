import mongoose from "mongoose";

const carSchema = new mongoose.Schema({
    category: {
        unique: false,
        type: String,
        required: true
    },
    transmission: {
        unique: false,
        type: String,
        required: true
    },
    fuelType: {
        unique: false,
        type: String,
        required: true
    },
    make: {
        unique: false,
        type: String,
        required: true
    },
    model: {
        unique: false,
        type: String,
        required: true
    },
    variant: {
        unique: false,
        type: String,
        required: true
    },
    year: {
        unique: false,
        type: String,
        required: true
    },
    mileage: {
        unique: false,
        type: String,
        required: true
    },
    price: {
        unique: false,
        type: Number,
        required: true
    },
    images: [String],
    createdAt: Date,
    soldAt: {
        type: Date,
        default: null
    },
    status: {
        unique: false,
        type: String,
        required: true,
        default: 'Active'
    },
})

export default mongoose.model('Car', carSchema);