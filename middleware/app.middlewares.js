import helmet from "helmet";
import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import rateLimit from "express-rate-limit";
import hpp from "hpp";
import { json } from "express";

// CORS whitelist for development
const whitelist = [
    'http://localhost:5173',
    'http://localhost:5174',
    // Add production origins here when ready
];

const corsOptions = {
    origin: function (origin, callback) {
        if (!origin) return callback(null, true); // Allow non-browser requests
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: 'GET,POST,PUT,DELETE,PATCH,HEAD',
    optionsSuccessStatus: 200
};

export const uploadsCors = cors({
  origin: 'http://localhost:5173',
  credentials: true,
});

// Rate limiter: max 100 requests per 15 minutes per IP
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100,
    message: 'Too many requests from this IP, please try again later.'
});

const appMiddlewares = [
    cors(corsOptions),
    helmet({
        crossOriginResourcePolicy: false,
    }),
    compression(),
    cookieParser(),
    json(),
    limiter,
    hpp()
];

export default appMiddlewares;