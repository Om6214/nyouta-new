import express from 'express';
import { addToCart, getCart, removeFromCart, updateCart } from '../controllers/cartController.js';
const router = express.Router();

router.post('/add-to-cart', addToCart);
router.get('/get-cart', getCart);
router.delete('/remove-from-cart/:productId', removeFromCart);
router.put('/update-cart/:productId', updateCart);

export default router;