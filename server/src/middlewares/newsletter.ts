import express from 'express';
import { validateEmail } from '../utils/validate.js';
import checkErrors from '../utils/check-validation-errors.js';
import type { Request, Response } from 'express';
import { Email } from '../schemas/newsletter.js';

const NewsletterRouter = express.Router();

// /POST /api/email is a public route
NewsletterRouter.post('/api/email', validateEmail, checkErrors, async (req: Request, res: Response) => {
    try {
        const email = await Email.findOne({ email: req.body.email });
        console.log(email);
        !email && await new Email({ email: req.body.email }).save();
        res.status(201).json({ success: true, exists: email ? true : false });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, errorMessage: error instanceof Error ? error.message : 'An unexpected error occurred. Please try again later' });
    }
})

export default NewsletterRouter;