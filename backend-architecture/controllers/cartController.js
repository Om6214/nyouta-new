import Cart from '../models/Cart.js';
import Product from '../models/Product.js';
import User from '../models/User.js';


export const addToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const userId = req.user._id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        const cart = await Cart.findOne({ user: userId });
        if (!cart) {
            cart = new Cart({ user: userId, products: [], totalPrice: 0 });
        }
        cart.products.push({ product: productId, quantity });
        cart.totalPrice += product.price * quantity;
        await cart.save();
        user.cart = cart._id;
        await user.save();
        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getCart = async (req, res) => {
    try {   
        const userId = req.user._id;
        const cart = await Cart.findOne({ user: userId }).populate('products');
        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const removeFromCart = async (req, res) => {
    try {
        const { productId } = req.params;
        const userId = req.user._id;
        const cart = await Cart.findOneAndUpdate({ user: userId }, { $pull: { products: productId } });
        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const updateCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const userId = req.user._id;
        const cart = await Cart.findOneAndUpdate({ user: userId }, { $set: { products: productId, quantity } });
        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};
