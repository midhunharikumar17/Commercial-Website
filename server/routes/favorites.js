const express = require('express');
const Favorite = require('../models/Favorite');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

// Get user's favorites
router.get('/', authMiddleware, async (req, res) => {
  try {
    const favorites = await Favorite.find({ user: req.user.userId })
      .populate('product');
    res.json(favorites);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add to favorites
router.post('/add', authMiddleware, async (req, res) => {
  try {
    const { productId } = req.body;

    // Check if already favorited
    const existing = await Favorite.findOne({
      user: req.user.userId,
      product: productId,
    });

    if (existing) {
      return res.status(400).json({ message: 'Product already in favorites' });
    }

    const favorite = new Favorite({
      user: req.user.userId,
      product: productId,
    });

    await favorite.save();
    await favorite.populate('product');
    res.json(favorite);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Product already in favorites' });
    }
    res.status(500).json({ message: error.message });
  }
});

// Remove from favorites
router.delete('/remove', authMiddleware, async (req, res) => {
  try {
    const { productId } = req.body;

    const favorite = await Favorite.findOneAndDelete({
      user: req.user.userId,
      product: productId,
    });

    if (!favorite) {
      return res.status(404).json({ message: 'Favorite not found' });
    }

    res.json({ message: 'Removed from favorites' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

