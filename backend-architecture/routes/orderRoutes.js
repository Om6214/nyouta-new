import express from 'express';
import { authenticateToken } from '../middlewares/authMiddleware.js';
import { placeOrder } from '../controllers/orderController.js';

const router = express.Router();

// Route to place an order
router.post('/', authenticateToken, placeOrder);

export default router;
