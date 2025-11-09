import type { Request, Response } from "express";

export function isAuthenticated(req: Request, res: Response) {
    if(req.user) {
        res.status(200).json({ success: true });
        return;
    }
    res.status(401).json({ success: false, errorMessage: 'User is not authenticated' });
}