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
import cors from 'cors';
import getClientDomain from './utils/domain.js';
import cloudinary from 'cloudinary';

connectToDB();

if(!process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET || !process.env.CLOUDINARY_CLOUD_NAME) {
    console.error('No cloudinary credentials detected');
    process.exit(1);
}

cloudinary.v2.config({
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME
})

const app = express();

app.use(cors({ origin: (origin, callback) => {
    callback(getClientDomain(origin) ? null : new Error('Not allowed by CORS'), getClientDomain(origin));
}, credentials: true }));
app.use(session({
    saveUninitialized: false,
    resave: false,
    secret: process.env.SESSION_SECRET || "Session Secretttt092jsd",
}))
app.use(express.json());
app.use(AuthRouter);
app.use(InventoryRouter);
app.use(EnquiriesRouter);
app.use(SettingsRouter);
app.use(DashboardRouter);

app.listen(3000, () => console.log('Listening on PORT 3000'));

export { cloudinary }