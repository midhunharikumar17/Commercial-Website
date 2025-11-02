const express = require('express');
const Review = require('../models/Review');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

// Get reviews for a product
router.get('/:productId', async (req, res) => {
  try {
    const reviews = await Review.find({ product: req.params.productId })
      .populate('user', 'name email')
      .sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create review
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { productId, rating, comment } = req.body;

    const review = new Review({
      user: req.user.userId,
      product: productId,
      rating,
      comment,
    });

    await review.save();
    await review.populate('user', 'name email');
    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

