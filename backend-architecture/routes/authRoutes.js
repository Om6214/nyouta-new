// server/routes/authRoutes.js
import express from 'express';
const router = express.Router();
import {register,googleSignup,login,verifyEmail,getAllUsers} from '../controllers/authController.js';

// Register Route
router.post('/register', register);
router.post('/google-signup', googleSignup);

// Login Route
router.post('/login', login);

// Verify email
router.post('/verify-email', verifyEmail);
router.get('/getAllUsers', getAllUsers);

export default router;
