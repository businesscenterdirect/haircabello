import express from 'express';
const router = express.Router();
import stripeController from '../controllers/stripe.controller.js';

// Important: Webhook must use express.raw middleware to verify signature
router.post('/webhook', express.raw({ type: 'application/json' }), stripeController.handleWebhook);

router.get('/session/:sessionId', stripeController.getSessionDetails);

export default router;
