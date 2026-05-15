import express from 'express';
const router = express.Router();
import adminAuthController from '../controllers/adminAuth.controller.js';

// Admin Login
router.post('/login', adminAuthController.login);
router.post('/logout', (req, res) => {
    res.clearCookie('admin_token');
    res.json({ message: 'Logged out successfully' });
});

export default router;
