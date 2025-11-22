import dotenv from 'dotenv';
dotenv.config();

export default function getClientDomain(origin: string | undefined) {
    if(process.env.CLIENT_DOMAIN === undefined) return false;
    if(origin === 'http://localhost:3000' || origin === process.env.CLIENT_DOMAIN) {
        return true;
    }
    return false;
}