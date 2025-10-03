import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import session from 'express-session';
import connectToDB from './db.js';
import authRouter from './middlewares/auth.js';
import cors from 'cors';
import getClientDomain from './utils/domain.js';

connectToDB();

const app = express();

app.use(cors({ origin: (origin, callback) => {
    callback(getClientDomain(origin) ? null : new Error('Not allowed by CORS'), getClientDomain(origin));
} }));
app.use(session({
    saveUninitialized: false,
    resave: false,
    secret: process.env.SESSION_SECRET || "Session Secretttt092jsd"
}))
app.use(express.json());
app.use(authRouter);

app.listen(3000, () => console.log('Listening on PORT 3000'));