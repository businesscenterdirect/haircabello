import express from 'express';
const router = express.Router();
import memberController from '../controllers/member.controller.js';
import stripeController from '../controllers/stripe.controller.js';
import auth from '../middleware/auth.middleware.js';

router.get('/me', auth, memberController.getMe);
router.patch('/next-order', auth, memberController.updateNextOrderPreferences);
router.post('/cancel', auth, memberController.memberCancelSubscription);
router.post('/billing-portal', auth, stripeController.createBillingPortal);

export default router;

