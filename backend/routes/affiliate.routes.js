import express from 'express';
const router = express.Router();
import affiliateAuth from '../middleware/affiliateAuth.middleware.js';
import authController from '../controllers/affiliateAuth.controller.js';
import portalController from '../controllers/affiliatePortal.controller.js';

// Public
router.post('/signup', authController.affiliateSignup);
router.post('/login', authController.affiliateLogin);
router.post('/logout', (req, res) => {
    res.clearCookie('affiliate_token');
    res.json({ message: 'Logged out successfully' });
});

// Protected (affiliate auth)
router.get('/me', affiliateAuth, portalController.getMe);
router.get('/referrals', affiliateAuth, portalController.getReferrals);
router.get('/commissions', affiliateAuth, portalController.getCommissions);
router.get('/creatives', affiliateAuth, portalController.getCreatives);
router.patch('/settings', affiliateAuth, portalController.updateSettings);

export default router;
