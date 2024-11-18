const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Initialize app
const app = express();

// Middleware
app.use(bodyParser.json());

// Connect to the database
connectDB();

// Routes
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

// Port
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Import product routes
const productRoutes = require('./routes/productRoutes');

// Use product routes
app.use('/api/products', productRoutes);

console.log('JWT_SECRET:', process.env.JWT_SECRET);

const cors = require('cors');

// Middleware
app.use(cors({
    origin: 'http://localhost:5173', // Replace with your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    credentials: true, // If cookies or credentials are used
}));

app.options('*', cors()); // Enable preflight for all routes
app.get('/', (req, res) => {
    res.send('CORS Test Successful!');
  });