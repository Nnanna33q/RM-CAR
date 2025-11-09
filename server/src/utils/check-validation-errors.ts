import { validationResult } from "express-validator";
import type { Request, Response, NextFunction } from "express";

export default function checkErrors(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        res.status(400).json({ success: false, errorMessage: errors.array()[0]?.msg });
        return;
    }
    next();
}
