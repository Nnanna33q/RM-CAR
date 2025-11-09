import express from 'express';
import { authChecker } from './auth.js';
import multer, { memoryStorage} from 'multer';
import { cloudinary } from '../index.js';
import fileFilter from '../utils/file-filter.js';
import BusinessInfo from '../schemas/business-info.js';
import { validateBusinessEmail, validatePhone, validateInstagramProfileLink, validateFacebookProfileLink, validateTiktokProfileLink, validateCredentialsFields } from '../utils/validate.js';
import checkErrors from '../utils/check-validation-errors.js';
import Admin from '../schemas/admin.js';
import { compareSync, hashSync } from 'bcryptjs';
import type { Request, Response } from 'express';

const upload = multer({
    storage: memoryStorage(),
    limits: {
        fileSize: 10485760,
        files: 20
    },
    fileFilter: fileFilter
});
const SettingsRouter = express.Router();

SettingsRouter.get('/api/business-info', async (req, res) => {
    // Public endpoint. Anyone can call it;
    try {
        const businessInfo = await BusinessInfo.findOne({ name: 'rm-car-sales' });
        if(!businessInfo) throw new Error('No business info found');
        res.status(200).json({ success: true, businessInfo });
    } catch(error) {
        console.error(error);
        res.status(500).json({ success: false, errorMessage: 'Failed to get business info' });
    }
})

SettingsRouter.post('/api/logo', authChecker, upload.single('logo'), async (req, res) => {
    // Updates Business Logo
    try {
        const file = req.file
        const businessInfo = await BusinessInfo.findOne({ name: 'rm-car-sales' });
        if(!file) throw new Error('No file found');
        if(!businessInfo|| !businessInfo.logo) throw new Error(businessInfo ? 'Invalid logo public id' : 'No logo public id found');
        const uploadResponse = await cloudinary.v2.uploader.upload(`data:${file.mimetype};base64,${file.buffer.toString('base64')}`, { resource_type: 'image', display_name: 'Business Logo' });
        await BusinessInfo.findOneAndUpdate({ name: 'rm-car-sales'}, { logo: uploadResponse.secure_url, publicId: uploadResponse.public_id });
        await cloudinary.v2.uploader.destroy(businessInfo.publicId)
        res.status(200).json({ success: true, url: uploadResponse.secure_url });
    } catch(error) {
        console.error(error);
        res.status(500).json({ success: false, errorMessage: error instanceof Error ? error.message : 'An unexpected error occurred' });
    }
})

SettingsRouter.patch('/api/update/email', authChecker, validateBusinessEmail, checkErrors, async (req: Request, res: Response) => {
    try {
        await BusinessInfo.findOneAndUpdate({ name: 'rm-car-sales' }, { email: req.body.email });
        res.status(200).json({ success: true });
    } catch(error) {
        console.error(error);
        res.status(500).json({ success: false, errorMessage: error instanceof Error ? error.message : 'An unexpected error occurred' });
    }
})

SettingsRouter.patch('/api/update/phone', authChecker, validatePhone, checkErrors, async (req: Request, res: Response) => {
    try {
        await BusinessInfo.findOneAndUpdate({ name: 'rm-car-sales' }, { phone: req.body.phone });
        res.status(200).json({ success: true });
    } catch(error) {
        console.error(error);
        res.status(500).json({ success: false, errorMessage: error instanceof Error ? error.message : 'An unexpected error occurred' });
    }
})

SettingsRouter.patch('/api/update/instagram', authChecker, validateInstagramProfileLink, checkErrors, async (req: Request, res: Response) => {
    try {
        await BusinessInfo.findOneAndUpdate({ name: 'rm-car-sales' }, { instagramProfileLink: req.body.instagramProfileLink });
        res.status(200).json({ success: true });
    } catch(error) {
        console.error(error);
        res.status(500).json({ success: false, errorMessage: error instanceof Error ? error.message : 'An unexpected error occurred' });
    }
})

SettingsRouter.patch('/api/update/facebook', authChecker, validateFacebookProfileLink, checkErrors, async (req: Request, res: Response) => {
    try {
        await BusinessInfo.findOneAndUpdate({ name: 'rm-car-sales' }, { facebookProfileLink: req.body.facebookProfileLink });
        res.status(200).json({ success: true });
    } catch(error) {
        console.error(error);
        res.status(500).json({ success: false, errorMessage: error instanceof Error ? error.message : 'An unexpected error occurred' });
    }
})

SettingsRouter.patch('/api/update/tiktok', authChecker, validateTiktokProfileLink, checkErrors, async (req: Request, res: Response) => {
    try {
        await BusinessInfo.findOneAndUpdate({ name: 'rm-car-sales' }, { tiktokProfileLink: req.body.tiktokProfileLink });
        res.status(200).json({ success: true });
    } catch(error) {
        console.error(error);
        res.status(500).json({ success: false, errorMessage: error instanceof Error ? error.message : 'An unexpected error occurred' });
    }
})

SettingsRouter.patch('/api/update/credentials', authChecker, validateCredentialsFields, checkErrors, async (req: Request, res: Response) => {
    try {
        const { currentPassword, newUsername, newPassword } = req.body;
        const admin = await Admin.findOne({ adminId: 1 });
        if(!admin) throw new Error('Requested resource does not exist');
        if(!compareSync(currentPassword, admin.password)) throw new Error('Authentication failed — wrong password');
        await Admin.updateOne({ adminId: 1 }, {
            username: newUsername,
            password: hashSync(newPassword)
        })
        res.status(200).json({ success: true });
    } catch(error) {
        console.error(error);
        res.status(500).json({ success: false, errorMessage: error instanceof Error ? error.message : 'An unexpected error occurred' });
    }
})

export default SettingsRouter