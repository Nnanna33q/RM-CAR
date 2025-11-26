import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import session from 'express-session';
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
import getClientDomain from './utils/domain.js';
import cloudinary from 'cloudinary';
import MongoStore from 'connect-mongo';

connectToDB();

if(!process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET || !process.env.CLOUDINARY_CLOUD_NAME) {
    console.error('No cloudinary credentials detected');
    process.exit(1);
}

if(!process.env.MONGOOSE_CONNECTIONSTRING) {
    console.error('No mongodb connection string detected');
    process.exit(1);
}

cloudinary.v2.config({
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME
})

const app = express();

app.use(cors({ origin: (origin, callback) => {
    console.log(origin);
    console.log(process.env.CLIENT_DOMAIN);
    callback(getClientDomain(origin) ? null : new Error('Not allowed by CORS'), process.env.NODE_ENV === 'production' ? process.env.CLIENT_DOMAIN : 'http://localhost:5173');
}, credentials: true }));

app.use(session({
    saveUninitialized: false,
    resave: false,
    secret: process.env.SESSION_SECRET || "Session Secretttt092jsd",
    cookie: {
        maxAge: 24 * 60 * 60 * 1000,
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true
    },
    store: MongoStore.create({
        mongoUrl: process.env.MONGOOSE_CONNECTIONSTRING,
        ttl: 24 * 60 * 60
    })
}))
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