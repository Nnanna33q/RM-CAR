import express from 'express';
import { getCarListings, countListingsCars } from '../utils/cars.js';
import Car from '../schemas/car.js';

const ListingsRouter = express.Router();

ListingsRouter.get('/api/listings', async (req, res) => {
    try {
        const { page, limit, sortBy, make, model, category, fuelType, transmission} = req.query;
        if(typeof page !== 'string' || typeof limit !== 'string') throw new Error(page ? 'Limit not set' : 'Page number not set');
        if(sortBy !== 'Default' && sortBy !== 'Ascending' && sortBy !== 'Descending') throw new Error('Invalid sortBy query parameter');
        if(typeof make !== 'string' || typeof model !== 'string' || typeof category !== 'string' || typeof fuelType !== 'string' || typeof transmission !== 'string') throw new Error('Invalid filter option');
        const [cars, totalCars] = await Promise.all([
            getCarListings(parseInt(page), parseInt(limit), sortBy, make, model, category, fuelType, transmission),
            countListingsCars(make, model, category, fuelType, transmission)
        ])
        res.status(200).json({ success: true, cars, totalCars });
    } catch(error) {
        console.error(error);
        res.status(500).json({ success: false, errorMessage: error instanceof Error ? error.message : 'Server request failed — unable to display listings' });
    }
})

ListingsRouter.get('/api/listings/filter', async (req, res) => {
    try {
        const filters = await Promise.all([
            Car.distinct('make', { status: 'Active' }),
            Car.distinct('model', { status: 'Active' }),
            Car.distinct('category', { status: 'Active' }),
            Car.distinct('fuelType', { status: 'Active' }),
            Car.distinct('transmission', { status: 'Active' })
        ])
        res.status(200).json({ success: true, filter: {
            makes: filters[0],
            models: filters[1],
            categories: filters[2],
            fuelTypes: filters[3],
            transmissions: filters[4]
        } })
    } catch(error) {
        console.error(error);
        res.status(500).json({ success: false, errorMessage: error instanceof Error ? error.message : 'Server request failed — unable to retrieve filters' });
    }
})

export default ListingsRouter;