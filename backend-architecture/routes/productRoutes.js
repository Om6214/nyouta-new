import express from 'express';
import { authenticateToken, authorizeRole } from '../middlewares/authMiddleware.js';
import Product from '../models/Product.js';

const router = express.Router();

router.post('/', authenticateToken, authorizeRole(['admin']), async (req, res) => {
    const { name, price, category, description, stock } = req.body;

    try {
        const product = await Product.create({
            name,
            price,
            category,
            description,
            stock,
            createdBy: req.user.id,
        });
        res.status(201).json({ message: 'Product added successfully', product });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

export default router;
