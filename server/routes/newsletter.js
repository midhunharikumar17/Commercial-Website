const express = require('express');
const User = require('../models/User');
const router = express.Router();

// Subscribe to newsletter
router.post('/subscribe', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    // Check if user exists and update newsletter subscription
    const user = await User.findOne({ email });
    if (user) {
      user.newsletterSubscribed = true;
      await user.save();
      return res.json({ message: 'Successfully subscribed to newsletter' });
    }

    // If user doesn't exist, just acknowledge (or create a newsletter subscriber record)
    res.json({ message: 'Successfully subscribed to newsletter' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

