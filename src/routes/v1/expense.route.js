const express = require('express');
const auth = require('../../middlewares/auth');
const { expenseController } = require('../../controllers');

const router = express.Router();

router
  .route('/')
  .post(auth('admin', 'user'), expenseController.createExpense)
  .get(auth('admin', 'user'), expenseController.getExpenses);

router
  .route('/:id')
  .get(auth('admin', 'user'), expenseController.getExpense)
  .patch(auth('admin', 'user'), expenseController.updateExpense)
  .delete(auth('admin'), expenseController.deleteExpense);

module.exports = router;