const express = require('express');
const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

// Get user's orders
router.get('/', authMiddleware, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.userId })
      .populate('items.product')
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create order
router.post('/create', authMiddleware, async (req, res) => {
  try {
    const { items, shippingInfo, paymentIntentId } = req.body;

    // Calculate total and verify products
    let total = 0;
    const orderItems = [];

    for (const item of items) {
      const product = await Product.findById(item.productId);
      if (!product) {
        return res.status(404).json({ message: `Product ${item.productId} not found` });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({ message: `Insufficient stock for ${product.name}` });
      }

      total += product.price * item.quantity;
      orderItems.push({
        product: item.productId,
        quantity: item.quantity,
        price: product.price,
      });

      // Update stock
      product.stock -= item.quantity;
      await product.save();
    }

    const order = new Order({
      user: req.user.userId,
      items: orderItems,
      total,
      shippingInfo,
      paymentIntentId,
      status: 'processing',
    });

    await order.save();
    
    // Clear cart
    await Cart.findOneAndUpdate(
      { user: req.user.userId },
      { items: [] }
    );

    await order.populate('items.product');
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

