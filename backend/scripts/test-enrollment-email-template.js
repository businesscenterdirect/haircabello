import mongoose from 'mongoose';
import User from '../models/User.js';
import emailService from '../services/email.service.js';
import path from 'path';
import { fileURLToPath } from 'url';
import 'dotenv/config';

// ESM __dirname replacement
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const MONGO_URI = process.env.MONGO_URI;

async function testTemplate() {
    if (!MONGO_URI) {
        console.error('MONGO_URI missing');
        process.exit(1);
    }

    await mongoose.connect(MONGO_URI);
    console.log('--- Testing Enrollment Email Template ---');

    // Create a mock user
    const testEmail = 'komalsoftiatric@gmail.com'; // Using your email for both to be safe
    const mockUser = new User({
        fullName: 'Test Template User',
        email: testEmail,
        phone: '1234567890',
        serviceAddress: '123 Leak Lane, Water City',
        plan: 'premium',
        planPrice: 49,
        activatedAt: new Date(),
        waitingPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        role: 'member',
        subscriptionStatus: 'active',
        confirmationEmailSent: false
    });

    console.log('Mock user prepared for plan:', mockUser.plan);

    try {
        console.log('Triggering emailService.sendEnrollmentConfirmationEmail...');
        // Note: sendEnrollmentConfirmationEmail might be deprecated/renamed to sendWelcomeEmail in HairCabello
        if (emailService.sendEnrollmentConfirmationEmail) {
            await emailService.sendEnrollmentConfirmationEmail(mockUser);
        } else if (emailService.sendWelcomeEmail) {
            await emailService.sendWelcomeEmail(mockUser.email, {
                name: mockUser.fullName,
                password: 'TestPassword123',
                plan: mockUser.plan,
                price: mockUser.planPrice,
                hairLength: '20',
                hairType: 'straight',
                gifts: ['Gift 1']
            });
        }
        console.log('✅ Success: Email triggered.');
    } catch (err) {
        console.error('❌ Error triggering email:', err);
    }

    mongoose.connection.close();
}

testTemplate();
