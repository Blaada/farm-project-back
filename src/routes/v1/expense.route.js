const express = require('express');
const auth = require('../../middlewares/auth');
const { expenseController } = require('../../controllers');

const router = express.Router();

router
  .route('/')
  .post(expenseController.createExpense)
  .get(expenseController.getExpenses);

router
  .route('/:id')
  .get(expenseController.getExpense)
  .patch(expenseController.updateExpense)
  .delete(expenseController.deleteExpense);

module.exports = router;