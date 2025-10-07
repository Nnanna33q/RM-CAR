import express from 'express';
import type { Request, Response } from 'express';
import multer, { memoryStorage } from 'multer';
import fileFilter from '../utils/file-filter.js';

const InventoryRouter = express.Router();

const upload = multer({
    storage: memoryStorage(),
    limits: {
        fileSize: 10485760,
        files: 20
    },
    fileFilter: fileFilter
});

InventoryRouter.post('/api/cars', upload.array('image', 20), async (req: Request, res: Response) => {
    console.log(req.files);
    // Upload files to cloudinary
})

export default InventoryRouter