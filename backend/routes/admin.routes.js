import express from 'express';
const router = express.Router();
import adminController from '../controllers/admin.controller.js';

router.get('/dashboard', adminController.getDashboardStats);

export default router;
