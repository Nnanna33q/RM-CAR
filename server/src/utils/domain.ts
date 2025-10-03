import dotenv from 'dotenv';
dotenv.config();

export default function getClientDomain(origin: string | undefined) {
    if(origin === 'http://localhost:3000' || process.env.CLIENT_DOMAIN) {
        return true;
    }
    return false;
}