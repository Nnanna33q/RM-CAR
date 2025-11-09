import express from 'express';
import { authChecker } from './auth.js';
import Car from '../schemas/car.js';
import Enquiry from '../schemas/enquiry.js';
import { getSalesPercentageChange, getTotalCarsPercentageChange, getTotalEnquiriesPercentageChange } from '../utils/percentage-change.js';

const DashboardRouter = express.Router();

DashboardRouter.get('/api/overview', authChecker, async (req, res) => {
    try {
        const results = await Promise.all([
            Car.find().countDocuments(),
            Enquiry.find().countDocuments(),
            Car.find({ status: 'Sold' }).sort({ _id: -1 }),
            Car.find({
                status: 'Sold',
                createdAt: {
                    $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
                    $lte: new Date()
                }
            }),
            Car.find({
                status: 'Sold',
                createdAt: {
                    $gte: new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1),
                    $lt: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
                }
            }),
            Car.find({
                createdAt: {
                    $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
                    $lte: new Date()
                }
            }).countDocuments(),
            Car.find({
                createdAt: {
                    $gte: new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1),
                    $lt: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
                }
            }).countDocuments(),
            Enquiry.find({
                createdAt: {
                    $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
                    $lte: new Date()
                }
            }).countDocuments(),
            Enquiry.find({
                createdAt: {
                    $gte: new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1),
                    $lt: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
                }
            }).countDocuments(),
            Enquiry.find({ status: 'Pending' }).sort({ _id: -1 }).limit(5)
        ])
        let totalSales = 0;
        results[2].forEach(car => totalSales += car.price);
        const carsSoldThisMonth = results[3];
        const carsSoldLastMonth = results[4];
        const totalCarsOfThisMonth = results[5];
        const totalCarsOfLastMonth = results[6]
        const totalEnquiriesOfThisMonth = results[7];
        const totalEnquiriesOfLastMonth = results[8];

        const salesMadeInPastFiveDays = [];

        for (let i = 0; i < 5; i++) {
            const startOfDay = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - i);
            const endOfDay = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - i, 23, 59, 59, 999);
            let totalSalesOfDay = 0;

            carsSoldThisMonth.forEach(car => {
                if (car.soldAt >= startOfDay && car.soldAt <= endOfDay) totalSalesOfDay += car.price;
            })

            if (i === 0) {
                salesMadeInPastFiveDays.push({
                    date: 'Today',
                    amount: totalSalesOfDay
                })
            } else if (i === 1) {
                salesMadeInPastFiveDays.push({
                    date: 'Yesterday',
                    amount: totalSalesOfDay
                })
            } else salesMadeInPastFiveDays.push({
                date: startOfDay.toLocaleDateString('en-US', { weekday: 'short' }),
                amount: totalSalesOfDay
            })
        }

        const recentSales = [];

        for(let i = 4; i >= 0; i--) {
            if(results[2] && results[2][i]) {
                recentSales.push(results[2][i])
            }
        }

        res.status(200).json({
            success: true,
            info: {
                totalCars: results[0],
                totalEnquiries: results[1],
                totalSales,
                percentageChangeOfSales: getSalesPercentageChange({ carsSoldThisMonth, carsSoldLastMonth }),
                percentageChangeOfCars: getTotalCarsPercentageChange({ totalCarsOfThisMonth, totalCarsOfLastMonth }),
                percentageChangeOfEnquiries: getTotalEnquiriesPercentageChange({ totalEnquiriesOfThisMonth, totalEnquiriesOfLastMonth }),
                chartData: salesMadeInPastFiveDays.reverse(),
                recentSales,
                recentEnquiries: results[9]
            }
        });
    } catch (e) {
        console.error(e);
        res.status(500).json({ success: false, errorMessage: 'An unexpected error occurred' });
    }
});

export default DashboardRouter