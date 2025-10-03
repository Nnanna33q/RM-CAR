import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

export default async function connectToDB() {
    try {
        if(process.env.MONGOOSE_CONNECTIONSTRING) {
            await mongoose.connect(process.env.MONGOOSE_CONNECTIONSTRING);
            console.log('DB Connected!');
        }
    } catch(e) {
        console.error('Failed to connect to database');
        console.error(e);
        process.exit(1);
    }
}