const express = require('express');
const router = express.Router();

const {
  assignPocketMoney,
  spendPocketMoney,
  getTransactionHistory,
  getPocketMoneyHistory
} = require('../controllers/transaction.controller');


router.post('/assign', assignPocketMoney);
router.post('/spend', spendPocketMoney);
router.post('/getTransactionHistory', getTransactionHistory);
router.post('/getPocketMoneyHistory', getPocketMoneyHistory);

module.exports = router;
