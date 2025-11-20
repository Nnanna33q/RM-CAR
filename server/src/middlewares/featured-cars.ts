import express from 'express';
import { getCars } from '../utils/cars.js';
const FeaturedCarsRouter = express.Router();

FeaturedCarsRouter.get('/api/featured-cars', async (req, res) => {
    try {
        const cars = await getCars('Available', 1, 4);
        res.status(200).json({ success: true, cars });
    } catch(error) {
        console.error(error);
        res.status(500).json({ success: false, errorMessage: error instanceof Error ? error.message : 'Server request failed — unable to display featured cars' });
    }
})

export default FeaturedCarsRouter;