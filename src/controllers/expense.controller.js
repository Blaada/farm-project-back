const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { expenseService } = require('../services');

const createExpense = catchAsync(async (req, res) => {
  const expense = await expenseService.createExpense(req.body);
  res.status(httpStatus.CREATED).send(expense);
});

const getExpenses = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['expenseLabel']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await expenseService.queryExpenses(filter, options);
  res.send(result);
});

const getExpense = catchAsync(async (req, res) => {
  const expense = await expenseService.getExpenseById(req.params.id);
  if (!expense) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Expense not found');
  }
  res.send(expense);
});

const updateExpense = catchAsync(async (req, res) => {
  const expense = await expenseService.updateExpenseById(req.params.id, req.body);
  res.send(expense);
});

const deleteExpense = catchAsync(async (req, res) => {
  await expenseService.deleteExpenseById(req.params.id);
  res.send(req.params.id);
});

module.exports = {
  createExpense,
  getExpenses,
  getExpense,
  updateExpense,
  deleteExpense,
};
