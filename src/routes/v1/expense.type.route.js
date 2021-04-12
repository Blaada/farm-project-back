const express = require('express');
const auth = require('../../middlewares/auth');
const { expenseTypeController } = require('../../controllers');

const router = express.Router();

router
  .route('/')
  .post(auth('admin', 'user'), expenseTypeController.createExpenseType)
  .get(auth('admin', 'user'), expenseTypeController.getExpenseTypes);

router
  .route('/:id')
  .get(auth('admin', 'user'), expenseTypeController.getExpenseType)
  .patch(auth('admin', 'user'), expenseTypeController.updateExpenseType)
  .delete(auth('admin'), expenseTypeController.deleteExpenseType);

module.exports = router;