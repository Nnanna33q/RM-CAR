import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

export default async function connectToDB() {
    try {
        if(process.env.MONGOOSE_CONNECTIONSTRING && process.env.MONGOOSE_CONNECTIONSTRING_LOCAL) {
            await mongoose.connect(process.env.NODE_ENV === 'production' ? process.env.MONGOOSE_CONNECTIONSTRING : process.env.MONGOOSE_CONNECTIONSTRING_LOCAL);
            console.log('DB Connected!');
            console.log(`Running on ${process.env.NODE_ENV} mode`);
        }
    } catch(e) {
        console.error('Failed to connect to database');
        console.error(e);
        process.exit(1);
    }
}