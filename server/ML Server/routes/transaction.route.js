const express = require('express');
const router = express.Router();

const {
  assignPocketMoney,
  spendPocketMoney,
  getTransactionHistory,
} = require('../controllers/transaction.controller');


router.post('/assign', assignPocketMoney);
router.post('/spend', spendPocketMoney);
router.get('/getTransactionHistory', getTransactionHistory);

module.exports = router;
