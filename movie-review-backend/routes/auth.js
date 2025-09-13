const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Your User model
// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const email = req.body.email.trim().toLowerCase();
    const password = req.body.password;

    // 1️⃣ Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // 2️⃣ Compare input password with hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // 3️⃣ Generate JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    // 4️⃣ Send response
    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        joinedAt: user.joinedAt,
      },
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/auth/register
router.post('/register', async (req, res) => {
  const { username, email, password, displayName, favoriteGenres } = req.body;

  try {
    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: 'Email already registered' });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    user = new User({
      username,
      email,
      password: hashedPassword,
      displayName,
      favoriteGenres,
      joinedAt: new Date(),
    });

    await user.save();

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        displayName: user.displayName,
        favoriteGenres: user.favoriteGenres,
        avatar: user.avatar || null,
        joinedAt: user.joinedAt
      }
    });

  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});


module.exports = router;
