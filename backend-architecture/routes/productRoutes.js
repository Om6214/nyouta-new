import express from 'express';
import { authenticateToken, authorizeRole } from '../middlewares/authMiddleware.js';
import Product from '../models/Product.js';

const router = express.Router();

// Add a product (Admin only)
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
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Get all products with optional filters, sorting, and pagination
router.get('/', async (req, res) => {
    try {
        const { category, minPrice, maxPrice, sortBy, page = 1, limit = 10 } = req.query;

        // Build query object
        const query = {};
        if (category) query.category = category;
        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) query.price.$gte = Number(minPrice);
            if (maxPrice) query.price.$lte = Number(maxPrice);
        }

        // Pagination and sorting
        const skip = (page - 1) * limit;
        const sortOption = sortBy ? { [sortBy]: 1 } : { createdAt: -1 }; // Default: newest first

        // Fetch products
        const products = await Product.find(query).sort(sortOption).skip(skip).limit(Number(limit));
        const total = await Product.countDocuments(query);

        res.status(200).json({
            products,
            pagination: {
                total,
                page: Number(page),
                limit: Number(limit),
                totalPages: Math.ceil(total / limit),
            },
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Get a single product by ID
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

export default router;
