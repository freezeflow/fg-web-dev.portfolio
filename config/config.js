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
    COOKIE_SECURE,
    COOKIE_SAMESITE,
    SMTP_HOST,
    SMTP_PORT,
    SMTP_USER,
    SMTP_PASS,
    FRONTEND_URL,
    ADMIN_URL,
    PORTFOLIO_URL,
    CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET
} = process.env