const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  childId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    enum: ['income', 'expense'],
    required: true,
  },
  category: {
    type: String,
    enum: ['food', 'education', 'entertainment', 'luxury', 'saving', 'other'],
    default: 'other',
  },
  description: {
    type: String,
    default: '',
  },
  date: {
    type: Date,
    default: Date.now,
  },
  creditImpact: {
    type: Number, // Positive or negative impact on credit score
    default: 0,
  }
}, {
  timestamps: true,
});

module.exports = mongoose.model('Transaction', transactionSchema);
;

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
