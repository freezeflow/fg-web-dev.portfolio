import {config} from 'dotenv'

config({
    path: `.env.${process.env.NODE_ENV || 'development'}.local`
});

export const { 
    PORT, 
    NODE_ENV,
    DB_URI,
    JWT_ACCESS_SECRET,
    JWT_REFRESH_SECRET,
    JWT_ACCESS_EXPIRE,
    JWT_REFRESH_EXPIRE,
    SMTP_HOST,
    SMTP_PORT,
    SMTP_USER,
    SMTP_PASS,
    FRONTEND_URL
} = process.env