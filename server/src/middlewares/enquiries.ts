import express from 'express';
import { validateMessage } from '../utils/validate.js';
import checkErrors from '../utils/check-validation-errors.js';
import type { Request, Response } from 'express';
import Enquiry from '../schemas/enquiry.js';
import { authChecker } from './auth.js';
import { getEnquiries, countEnquiries } from '../utils/enquiries.js';

const EnquiriesRouter = express.Router();

// POST /api/enquiries is a public route
EnquiriesRouter.post('/api/enquiries', validateMessage, checkErrors, async (req: Request, res: Response) => {
    try {
        await new Enquiry({
            name: req.body.name,
            email: req.body.email,
            message: req.body.message,
            createdAt: Date.now()
        }).save();
        res.status(201).json({ success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, errorMessage: error instanceof Error ? error.message : 'An unexpected error occurred' });
    }
})

EnquiriesRouter.get('/api/enquiries', authChecker, async (req, res) => {
    try {
        if (typeof req.query.page === 'string') {
            const page = parseInt(req.query.page);
            const tablist = req.query.tablist;
            if (tablist !== 'All' && tablist !== 'Pending' && tablist !== 'Completed') {
                throw new Error('Invalid tablist value');
            }
            const [cars, totalCars] = await Promise.all([
                getEnquiries(tablist, page),
                countEnquiries(tablist)
            ])
            res.status(200).json({ success: true, cars: cars, totalCars: totalCars });
        } else {
            throw new Error('Invalid page query parameter');
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, errorMessage: error instanceof Error ? error.message : 'Failed to retrieve enquiries' });
    }
})

EnquiriesRouter.patch('/api/enquiries', authChecker, async (req, res) => {
    try {
        const { id, tablist, page } = req.body;
        await Enquiry.findByIdAndUpdate(id, { status: 'Completed' });
        const [enquiries, totalEnquiries] = await Promise.all([
            getEnquiries(tablist, page),
            countEnquiries(tablist)
        ])
        res.status(200).json({ success: true, enquiries, totalEnquiries });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, errorMessage: error instanceof Error ? error.message : 'Failed to mark enquiry as completed' });
    }
})

EnquiriesRouter.delete('/api/enquiries', authChecker, async (req, res) => {
    try {
        const { id, page, tablist }: { id: string, page: number, tablist: 'All' | 'Pending' | 'Completed' } = req.body;
        await Enquiry.findByIdAndDelete(id);
        const [enquiries, totalEnquiries] = await Promise.all([
            getEnquiries(tablist, page),
            countEnquiries(tablist)
        ])
        res.status(200).json({ success: true, enquiries, totalEnquiries });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, errorMessage: error instanceof Error ? error.message : 'Failed to delete enquiries' });
    }
})

export default EnquiriesRouter;