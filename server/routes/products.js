const express = require('express');
const Product = require('../models/Product');
const router = express.Router();

// Get all products with filtering, sorting, and pagination
router.get('/', async (req, res) => {
  try {
    const { category, sort, page = 1, limit = 12 } = req.query;
    
    // Build query
    const query = {};
    if (category) {
      query.category = category;
    }

    // Build sort
    let sortOption = {};
    if (sort === 'price-asc') sortOption = { price: 1 };
    else if (sort === 'price-desc') sortOption = { price: -1 };
    else if (sort === 'newest') sortOption = { createdAt: -1 };
    else sortOption = { createdAt: -1 };

    // Pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const products = await Product.find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Product.countDocuments(query);

    res.json({
      products,
      totalPages: Math.ceil(total / parseInt(limit)),
      currentPage: parseInt(page),
      total,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get best sellers
router.get('/bestsellers', async (req, res) => {
  try {
    const products = await Product.find({ bestSeller: true }).limit(8);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single product
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

