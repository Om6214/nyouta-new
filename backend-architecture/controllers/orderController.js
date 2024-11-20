import Order from '../models/Order.js';
import Product from '../models/Product.js';

// Place an order
const placeOrder = async (req, res) => {
  const { products, paymentInfo } = req.body;
  const userId = req.user.id;  // Assuming user is authenticated

  if (!products || !paymentInfo || !paymentInfo.method) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    let totalPrice = 0;
    const orderProducts = [];

    // Validate product data and calculate total price
    for (let item of products) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res.status(404).json({ message: `Product with ID ${item.product} not found` });
      }
      const itemPrice = product.price * item.quantity;
      totalPrice += itemPrice;

      orderProducts.push({
        product: product._id,
        quantity: item.quantity,
        price: itemPrice,
      });
    }

    // Create the order
    const order = new Order({
      user: userId,
      products: orderProducts,
      totalPrice,
      paymentInfo,
    });

    await order.save();

    res.status(201).json({
      message: 'Order placed successfully',
      order: {
        id: order._id,
        totalPrice: order.totalPrice,
        status: order.status,
        createdAt: order.createdAt,
      },
    });
  } catch (error) {
    console.error('Error placing order:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export { placeOrder };
