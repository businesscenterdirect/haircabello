import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

// --- STRICT ENVIRONMENT VALIDATION ---
const requiredEnv = [
    'MONGO_URI',
    'STRIPE_SECRET_KEY',
    'STRIPE_WEBHOOK_SECRET',
    'JWT_SECRET'
];
requiredEnv.forEach(env => {
    if (!process.env[env]) {
        console.error(`FATAL ERROR: ${env} is not defined in environment variables.`);
        process.exit(1);
    }
});

// Import Routes
import signupRoutes from './routes/signup.routes.js';
import stripeRoutes from './routes/stripe.routes.js';
import authRoutes from './routes/auth.routes.js';
import memberPortalRoutes from './routes/memberPortal.routes.js';
import adminAuthRoutes from './routes/adminAuth.routes.js';
import phase3AdminRoutes from './routes/admin.routes.js';

const app = express();

// Middleware
app.use(morgan('combined'));
app.use(cors({
    origin: [
        'https://hair-cabello.vercel.app',
        ...(process.env.FRONTEND_URL ? process.env.FRONTEND_URL.split(',') : [])
    ],
    credentials: true
}));

import { generalLimiter, authLimiter } from './middleware/rateLimiter.js';

// Mount Stripe routes BEFORE express.json() to allow raw body for webhooks
app.use('/api/stripe', stripeRoutes);

app.use(express.json());
app.use(cookieParser());

// Rate limiters are currently disabled to prevent potential hangs with Express 5 in this environment.
// To re-enable, uncomment the lines below and test thoroughly.
/*
app.use('/api/auth', authLimiter);
app.use('/api/signup', authLimiter);
app.use('/api/admin', generalLimiter);
app.use('/api/member', generalLimiter);
app.use('/api/members', generalLimiter);
app.use('/api/claims', generalLimiter);
app.use('/api/vendors', generalLimiter);
app.use('/api/affiliate', generalLimiter);
app.use('/api/affiliates-admin', generalLimiter);
*/



// --- DATABASE CONNECTION (Moved inside to fix the error) ---
const connectDB = async () => {
    try {
        // connect to mongodb
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected Successfully');
    } catch (error) {
        console.error('MongoDB Connection Failed:', error.message);
        process.exit(1);
    }
};

// Execute connection
connectDB();
// -----------------------------------------------------------

import adminAuth from './middleware/adminAuth.middleware.js';

// Routes
app.use('/api/signup', signupRoutes);
app.use('/api/admin', adminAuthRoutes); // Public admin login
app.use('/api/admin/ph3', adminAuth, phase3AdminRoutes); // Protected Admin Dash Stats
app.use('/api/auth', authRoutes);
app.use('/api/member', memberPortalRoutes);

// Base Route for testing
app.get('/', (req, res) => {
    res.send('HairCabello Backend is Running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});