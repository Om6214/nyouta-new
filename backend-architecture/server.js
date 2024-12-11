import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import connectDB from './config/db.js';  // Ensure to include the .js extension if it's an ES module
import authRoutes from './routes/authRoutes.js';  // Same as above
import productRoutes from './routes/productRoutes.js';  // Same as above
import morgan from 'morgan'
// Load environment variables
dotenv.config();

// Initialize app
const app = express();
app.use(morgan("tiny"));
// Middleware
app.use(bodyParser.json());
app.use(cors({
    origin: 'http://localhost:5173', // Replace with your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    credentials: true, // If cookies or credentials are used
}));
app.options('*', cors()); // Enable preflight for all routes

// Connect to the database
connectDB();

// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/products', productRoutes);

// Port
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Test route
app.get('/', (req, res) => {
    res.send('API is working correctly.');
});
