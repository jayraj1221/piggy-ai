const { response } = require('express');
const axios = require('axios');
const PocketMoney = require('../models/PocketMoney');
const Transaction = require('../models/Transaction');


exports.handleAssignPocketMoney = async (req) => {
  try {
    const { childId, amount, parentId } = req.body;

    if (amount <= 0) {
      return { status: 400, data: { message: 'Amount must be greater than 0' } };
    }

    const pocketMoney = new PocketMoney({
      childId,
      amount,
      givenBy: parentId
    });

    await pocketMoney.save();
    
    const response = await axios.post('http://localhost:5000/auth/assign-pocket-money', {
      childId,
      amount
    });

    return {
      status: 201,
      data: {
        message: 'Pocket money assigned successfully',
        pocketMoney,
        child: response.data
      }
    };
    
  } catch (error) {
    console.error('Error assigning pocket money:', error);
    return { status: 500, data: { message: 'Server error' } };
  }
};


exports.handleSpendPocketMoney = async (req) => {
  const { childId, amount, type, category, description } = req.body;

  if (amount <= 0) {
    return { status: 400, data: { message: 'Amount must be greater than 0' } };
  }

  const transaction = new Transaction({
    childId,
    amount,
    type: type || 'expense',
    category,
    description
  });

  await transaction.save();
  
  const response = await axios.post('http://localhost:5000/auth/assign-pocket-money', {
    childId,
    amount : -1 * amount,
  });

  return {
    status: 201,
    data: {
      message: 'Transaction successful',
      transaction,
      child: response.data
    }
  };
};


exports.handleGetTransactionHistory = async (req) => {
  const { userId } = req.body;

  try {
    const transactions = await Transaction.find({ childId: userId });
    return { status: 200, data: transactions };
  } catch (error) {
    console.error('Error fetching transaction history:', error);
    return { status: 500, data: { message: 'Server error' } };
  }
}
