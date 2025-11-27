import jwt from "jsonwebtoken"
import type { Request, Response } from "express";
import dotenv from 'dotenv';
dotenv.config();

const secret = process.env.JWT_SECRET_KEY;

export function isAuthenticated(req: Request, res: Response) {
    try {
        const token = req.headers['authorization']?.split(' ')[1];
        if(!secret) throw new Error('No JWT Secret Key detected in environment');
        if(!token) throw new Error('No access token detected');
        jwt.verify(token, secret);
        res.status(200).json({ success: true });
    } catch(error) {
        console.error(error);
        res.status(400).json({ success: false, errorMessage: error instanceof Error ? error.message : 'An unexpected error occurred' });
    }
}