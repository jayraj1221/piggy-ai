const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { protect } = require('../middleware/authMiddleware');

// @route   POST /api/register/parent
// @desc    Register a parent user
// @access  Public
router.post('/register/parent',async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    // Create new parent user
    const parent = new User({
      name,
      email,
      password,
      role: 'parent',
    });

    await parent.save();

    // Generate token
    const token = jwt.sign({ id: parent._id, role: parent.role }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    res.status(201).json({
      message: 'Parent registered successfully',
      user: {
        id: parent._id,
        name: parent.name,
        email: parent.email,
        role: parent.role,
      },
      token,
    });
  } catch (error) {
    console.error('Error registering parent:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/register/child
// @desc    Register a child user (parent must be logged in)
// @access  Protected
router.post('/register/child',protect, async (req, res) => {
    try {
      const { name, email, password, parentId } = req.body;
  
      // Check if parent exists
      const parent = await User.findById(parentId);
      if (!parent || parent.role !== 'parent') {
        return res.status(400).json({ message: 'Invalid parent ID' });
      }
  
      // Check if child email already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) return res.status(400).json({ message: 'Email already in use' });
  
      const child = new User({
        name,
        email,
        password,
        role: 'child',
        parentId
      });
  
      await child.save();
  
      res.status(201).json({
        message: 'Child registered successfully',
        user: {
          id: child._id,
          name: child.name,
          email: child.email,
          role: child.role,
          parentId: child.parentId
        }
      });
    } catch (error) {
      console.error('Error registering child:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  
// @route   POST /api/login
// @desc    Login user (parent or child)
// @access  Public
router.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Check if user exists
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ message: 'User not found' });
  
      // Compare password
      const isMatch = await user.matchPassword(password);
      if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });
  
      // Generate token
      const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: '7d',
      });
  
      res.status(200).json({
        message: 'Login successful',
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          parentId: user.parentId || null
        },
        token
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  
module.exports = router;
