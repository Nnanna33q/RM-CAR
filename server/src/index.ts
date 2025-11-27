import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import connectToDB from './db.js';
import AuthRouter from './middlewares/auth.js';
import InventoryRouter from './middlewares/inventory.js';
import EnquiriesRouter from './middlewares/enquiries.js';
import SettingsRouter from './middlewares/settings.js';
import DashboardRouter from './middlewares/dashboard.js';
import ListingsRouter from './middlewares/listings.js';
import NewsletterRouter from './middlewares/newsletter.js';
import FeaturedCarsRouter from './middlewares/featured-cars.js';
import cors from 'cors';
import cloudinary from 'cloudinary';

connectToDB();

if(!process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET || !process.env.CLOUDINARY_CLOUD_NAME) {
    console.error('No cloudinary credentials detected');
    process.exit(1);
}

if(!process.env.MONGOOSE_CONNECTIONSTRING) {
    console.error('No mongodb connection string detected');
    process.exit(1);
}

if(!process.env.CLIENT_DOMAIN) {
    console.error('No client domain detected');
    process.exit(1);
}

cloudinary.v2.config({
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME
})

const app = express();

app.use(cors({ origin: process.env.NODE_ENV === 'production' ? process.env.CLIENT_DOMAIN : 'http://localhost:5173', credentials: true }))

app.use(express.json());

app.use(AuthRouter);
app.use(InventoryRouter);
app.use(EnquiriesRouter);
app.use(SettingsRouter);
app.use(DashboardRouter);
app.use(ListingsRouter);
app.use(NewsletterRouter);
app.use(FeaturedCarsRouter);

app.listen(3000, () => console.log('Listening on PORT 3000'));

export { cloudinary }