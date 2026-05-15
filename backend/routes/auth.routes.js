import express from 'express';
const router = express.Router();
import authController from '../controllers/auth.controller.js';
import authMiddleware from '../middleware/auth.middleware.js';

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/update-password', authMiddleware, authController.updatePassword);
router.post('/logout', (req, res) => {
    res.clearCookie('token');
    res.json({ message: 'Logged out successfully' });
});

export default router;
