import express from 'express';
import type { Request, Response } from 'express';
import multer, { memoryStorage } from 'multer';
import { validateCar } from '../utils/validate.js';
import checkErrors from '../utils/check-validation-errors.js';
import fileFilter from '../utils/file-filter.js';
import pLimit from 'p-limit';
import { authChecker } from './auth.js';
import Car from '../schemas/car.js';
import { deleteCarFromDb, deleteCloudinaryCarImages } from '../utils/delete-car.js';
import { cloudinary } from '../index.js';
import { getCars, countCars } from '../utils/cars.js';

const InventoryRouter = express.Router();

const limit = pLimit(10);

const upload = multer({
    storage: memoryStorage(),
    limits: {
        fileSize: 10485760,
        files: 20
    },
    fileFilter: fileFilter
});

InventoryRouter.get('/api/cars', authChecker, async (req, res) => {
    try {
        if (typeof req.query.page === 'string') {
            const page = parseInt(req.query.page);
            const tablist = req.query.tablist;
            if (tablist !== 'All' && tablist !== 'Available' && tablist !== 'Sold') {
                throw new Error('Invalid tablist value');
            }
            const [cars, totalCars] = await Promise.all([
                getCars(tablist, page),
                countCars(tablist)
            ])
            res.status(200).json({ success: true, cars: cars, totalCars: totalCars });
        } else {
            throw new Error('Invalid page query parameter');
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, errorMessage: error instanceof Error ? error.message : 'Failed to retrieve cars data' });
    }
})

InventoryRouter.post('/api/cars', authChecker, upload.array('image', 20), validateCar, checkErrors, async (req: Request, res: Response) => {
    const { tablist, page }: { tablist: "All" | "Available" | "Sold", page: string } = req.body;
    const files = req.files as Express.Multer.File[];
    const dataUrlImages = files.map(f => {
        return `data:${f.mimetype};base64,${f.buffer.toString('base64')}`;
    })

    try {
        const results = await Promise.all(
            dataUrlImages.map((d, i) => {
                return limit(() => {
                    return cloudinary.v2.uploader.upload(d, {
                        resource_type: 'image',
                        display_name: `${req.body.make} ${req.body.model} ${req.body.variant ? '' : req.body.variant} ${req.body.year}(${i})`
                    })
                })
            })
        )
        const images = results.map(r => r.secure_url);
        await new Car({
            category: req.body.category,
            transmission: req.body.transmission,
            fuelType: req.body.fuelType,
            make: req.body.make,
            model: req.body.model,
            variant: req.body.variant,
            year: req.body.year,
            mileage: req.body.mileage,
            price: Number(req.body.price),
            images: images,
            createdAt: Date.now()
        }).save();
        const [cars, totalCars] = await Promise.all([
            getCars(tablist, Number(page)),
            countCars(tablist)
        ])
        res.status(201).json({ success: true, cars, totalCars });
    } catch (e) {
        console.error(e);
        res.status(500).json({ success: false, errorMessage: 'An unexpected error occurred' });
    }
})

InventoryRouter.delete('/api/cars', authChecker, async (req, res) => {
    try {
        const { id, page, tablist }: { id: string, page: number, tablist: 'All' | 'Available' | 'Sold' } = req.body;
        const car = await Car.findById(id);
        if (!car) {
            throw new Error('Car not found in Database');
        }
        const result = await deleteCarFromDb(id, page, tablist);
        await deleteCloudinaryCarImages(car.images);
        res.status(200).json({ success: true, cars: result.cars, totalCars: result.totalCars });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, errorMessage: error instanceof Error ? error.message : 'An unexpected error occurred' });
    }
})

InventoryRouter.patch('/api/cars', authChecker, upload.array('image', 20), validateCar, checkErrors, async (req: Request, res: Response) => {
    try {
        const files = req.files as Express.Multer.File[];
        const car = await Car.findById(req.body.id);
        if (!car) {
            throw new Error('Car does not exist');
        }
        const dataUrlImages = files.map(f => {
            return `data:${f.mimetype};base64,${f.buffer.toString('base64')}`;
        })
        const promisesArray = dataUrlImages.map((d, i) => {
            return limit(() => {
                return cloudinary.v2.uploader.upload(d, {
                    resource_type: 'image',
                    display_name: `${req.body.make} ${req.body.model} ${req.body.variant ? '' : req.body.variant} ${req.body.year}(${i})`
                })
            })
        })
        files.length > 0 && promisesArray.push(deleteCloudinaryCarImages(car.images));
        const results = await Promise.all(promisesArray);
        results.pop();
        const images = results.map(r => r.secure_url);
        const updatedCar = await Car.findByIdAndUpdate(req.body.id, {
            category: req.body.category,
            transmission: req.body.transmission,
            fuelType: req.body.fuelType,
            make: req.body.make,
            model: req.body.model,
            variant: req.body.variant,
            year: req.body.year,
            mileage: req.body.mileage,
            price: req.body.price,
            images: images.length > 0 ? images : car.images,
            createdAt: car.createdAt,
            soldAt: car.soldAt
        }, { new: true });
        res.status(200).json({ success: true, updatedCar: updatedCar });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, errorMessage: error instanceof Error ? error.message : 'An unexpected error occurred' });
    }
})

InventoryRouter.post('/api/sold', authChecker, async (req, res) => {
    try {
        const { id, tablist, page } = req.body;
        await Car.findByIdAndUpdate(id, { status: 'Sold', soldAt: Date.now() });
        const [cars, totalCars] = await Promise.all([
            getCars(tablist, page),
            countCars(tablist)
        ])
        res.status(200).json({ success: true, cars, totalCars });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, errorMessage: error instanceof Error ? error.message : 'An unexpected error occurred' });
    }
})

export default InventoryRouter