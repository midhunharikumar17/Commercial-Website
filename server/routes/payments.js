const express = require('express');
// Initialize Stripe only if key is provided
const stripe = process.env.STRIPE_SECRET_KEY 
  ? require('stripe')(process.env.STRIPE_SECRET_KEY)
  : null;
const authMiddleware = require('../middleware/auth');
const router = express.Router();

// Create payment intent
router.post('/create-intent', authMiddleware, async (req, res) => {
  try {
    if (!stripe) {
      return res.status(503).json({ 
        message: 'Payment service not configured. Please set STRIPE_SECRET_KEY in .env file' 
      });
    }

    const { amount, currency = 'usd' } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ message: 'Invalid amount' });
    }

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency,
      metadata: {
        userId: req.user.userId.toString(),
      },
    });

    res.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Confirm payment
router.post('/confirm', authMiddleware, async (req, res) => {
  try {
    if (!stripe) {
      return res.status(503).json({ 
        message: 'Payment service not configured' 
      });
    }

    const { paymentIntentId } = req.body;

    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status === 'succeeded') {
      res.json({ success: true, paymentIntent });
    } else {
      res.status(400).json({ message: 'Payment not successful', paymentIntent });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

