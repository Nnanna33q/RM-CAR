import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import Admin from '../schemas/admin.js';
import jwt from 'jsonwebtoken';
import { compareSync } from 'bcryptjs';
import { validateLogin } from '../utils/validate.js';
import checkErrors from '../utils/check-validation-errors.js';
import { isAuthenticated } from '../utils/is-authenticated.js';
import type { Request, Response, NextFunction } from 'express';

if (!process.env.JWT_SECRET_KEY) {
    console.error('No Jwt Secret Key detected');
    process.exit(1);
}

const secret = process.env.JWT_SECRET_KEY;

type Admin = {
    _id: string,
    username: string,
    password: string,
    tokenVersion: number
}

class AuthError extends Error { };

export async function authChecker(req: Request, res: Response, next: NextFunction) {
    try {
        const token = req.headers['authorization']?.split(' ')[1];
        if (!secret) throw new Error('No JWT Secret Key detected in environment');
        if (!token) throw new Error('No access token detected');
        const payload = jwt.verify(token, secret) as Admin
        const admin = await Admin.findOne({ username: payload.username });
        if(!admin || admin.tokenVersion !== payload.tokenVersion) throw new Error('Your session has expired. Please log in again.');
        next();
    } catch(error) {
        console.error(error);
        res.status(400).json({ success: false, errorMessage: error instanceof Error ? error.message : 'An unexpected error occurred' });
    }
}

const AuthRouter = express.Router();

AuthRouter.post('/login', validateLogin, checkErrors, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { username, password } = req.body;
        const admin = await Admin.findOne({ username });
        if (!admin) throw new AuthError('Invalid username');
        if (!compareSync(password, admin.password)) throw new AuthError('Invalid password');
        res.status(200).json({ success: true, accessToken: jwt.sign(admin.toJSON(), secret, { expiresIn: "1d" }) })
    } catch (error) {
        console.error(error);
        if (error instanceof AuthError) {
            res.status(401).json({ success: false, errorMessage: error.message });
        } else if (error instanceof Error) {
            res.status(500).json({ success: false, errorMessage: error.message })
        } else res.status(500).json({ success: false, errorMessage: 'An unexpected error occurred' });
    }
})

AuthRouter.get('/api/authenticated', isAuthenticated);

export default AuthRouter