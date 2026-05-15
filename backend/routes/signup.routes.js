import express from 'express';
const router = express.Router();
import signupController from '../controllers/signup.controller.js';

router.post('/start', signupController.startSignup);

export default router;
