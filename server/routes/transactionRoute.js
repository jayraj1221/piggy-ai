const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const Transaction = require('../models/Transaction');
const User = require('../models/User'); // Import the User model

// Assign pocket money
router.post('/assign', protect, async (req, res) => {
  try {
    const { childId, amount, category, description } = req.body;

    // Ensure amount is valid
    if (amount <= 0) {
      return res.status(400).json({ message: 'Amount must be greater than 0' });
    }

    // Create transaction
    const transaction = new Transaction({
      childId,         // childId instead of userId
      amount,          // Amount assigned as pocket money
      type: 'income',  // Type is fixed to 'income' since it's pocket money
      category,        // Category of the transaction (e.g., food, education, etc.)
      description,     // Optional description for the transaction
      creditImpact: 0  // No credit impact by default for income transactions
    });

    // Save transaction
    await transaction.save();

    // Update the child's balance
    const child = await User.findById(childId);
    if (!child) {
      return res.status(404).json({ message: 'Child not found' });
    }

    // Update the balance of the child user
    child.pocketMoney += amount;
    await child.save();

    res.status(201).json({
      message: 'Pocket money assigned successfully',
      transaction,
      child: {
        id: child._id,
        balance: child.balance,
      },
    });
  } catch (error) {
    console.error('Error assigning pocket money:', error);
    res.status(500).json({ message: 'Server error' });
  }
});
router.post('/spend', protect, async (req, res) => {
    try {
      const { amount, category, description } = req.body;
      const childId = req.user.id; // Get logged-in child ID from JWT token
  
      // Ensure the user is a child
      const child = await User.findById(childId);
      if (!child || child.role !== 'child') {
        return res.status(403).json({ message: 'Only children can make transactions' });
      }
  
      // Ensure amount is valid
      if (amount <= 0) {
        return res.status(400).json({ message: 'Amount must be greater than 0' });
      }
  
      // Check if the child has enough balance
      if (child.balance < amount) {
        return res.status(400).json({ message: 'Insufficient balance' });
      }
  
      // Create a new expense transaction
      const transaction = new Transaction({
        childId,         // childId from the logged-in user
        amount,          // Amount spent
        type: 'expense', // Transaction type is expense (spending money)
        category,        // Category of the expense (e.g., food, entertainment)
        description,     // Optional description for the transaction
        creditImpact: -amount // Negative impact on the credit score for spending
      });
  
      // Save the transaction to the database
      await transaction.save();
  
      child.pocketMoney -= amount;
  
      await child.save();
  
      res.status(201).json({
        message: 'Transaction successful',
        transaction,
      });
    } catch (error) {
      console.error('Error performing transaction:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  
module.exports = router;
