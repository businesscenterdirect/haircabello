import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import path from 'path';
import { fileURLToPath } from 'url';
import 'dotenv/config'; // Usually defaults to .env in root if run from root
import User from '../models/User.js';

// ESM __dirname replacement
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const MONGO_URI = process.env.MONGO_URI;

async function seedAdmin() {
    if (!MONGO_URI) {
        console.error('MONGO_URI not found in .env');
        process.exit(1);
    }

    try {
        await mongoose.connect(MONGO_URI);
        console.log('Connected to MongoDB');

        const adminEmail = 'admin@leakassure.com';
        const existingAdmin = await User.findOne({ email: adminEmail });

        if (existingAdmin) {
            console.log('Admin already exists. Updating to ensure isolation...');
            existingAdmin.role = 'admin';
            existingAdmin.plan = undefined;
            existingAdmin.subscriptionStatus = undefined;
            existingAdmin.stripeCustomerId = undefined;
            existingAdmin.stripeSubscriptionId = undefined;
            existingAdmin.lastPaymentDate = undefined;
            existingAdmin.planPrice = undefined;

            // Re-hash password if needed or just save
            await existingAdmin.save();
            console.log('Admin account isolated.');
        } else {
            console.log('Creating new admin...');
            const hashedPassword = await bcrypt.hash('Admin@123', 10);
            await User.create({
                fullName: 'System Administrator',
                email: adminEmail,
                password: hashedPassword,
                role: 'admin',
                // Explicitly omitted subscription fields
            });
            console.log('New admin created: admin@leakassure.com / Admin@123');
        }

        // Optional: Cleanup ALL admins
        const result = await User.updateMany(
            { role: 'admin' },
            {
                $unset: {
                    plan: "",
                    subscriptionStatus: "",
                    stripeCustomerId: "",
                    stripeSubscriptionId: "",
                    lastPaymentDate: "",
                    planPrice: "",
                    stripeSessionId: "",
                    waitingPeriodEnd: "",
                    activatedAt: ""
                }
            }
        );
        console.log(`Cleaned up ${result.modifiedCount} admin accounts.`);

        mongoose.connection.close();
        console.log('Database connection closed');
    } catch (error) {
        console.error('Seeding error:', error);
        process.exit(1);
    }
}

seedAdmin();
