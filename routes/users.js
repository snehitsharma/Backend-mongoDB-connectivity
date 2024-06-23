const express = require('express');
const router = express.Router();
const User = require('./user');

// Registration route
router.post('/register', async (req, res) => {
  try {
    console.log('Registration attempt:', req.body);
    const { username, email, password } = req.body;

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create a new user
    user = new User({
      username,
      email,
      password // Note: In a real application, you should hash this password
    });

    // Save user to the database
    await user.save();
    console.log('User registered:', user);

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Login route
router.post('/login', async (req, res) => {
  try {
    console.log('Login attempt:', req.body);
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check password
    if (user.password !== password) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    console.log('User logged in:', user);
    res.json({ message: 'Login successful' });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;