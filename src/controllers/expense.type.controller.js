const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { expenseTypeService } = require('../services');

const createExpenseType = catchAsync(async (req, res) => {
  const expense = await expenseTypeService.createExpenseType(req.body);
  res.status(httpStatus.CREATED).send(expense);
});

const getExpenseTypes = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await expenseTypeService.queryExpenseTypes(filter, options);
  res.send(result);
});

const getExpenseType = catchAsync(async (req, res) => {
  const expense = await expenseTypeService.getExpenseTypeById(req.params.id);
  if (!expense) {
    throw new ApiError(httpStatus.NOT_FOUND, 'ExpenseType not found');
  }
  res.send(expense);
});

const updateExpenseType = catchAsync(async (req, res) => {
  const expense = await expenseTypeService.updateExpenseTypeById(req.params.id, req.body);
  res.send(expense);
});

const deleteExpenseType = catchAsync(async (req, res) => {
  await expenseTypeService.deleteExpenseTypeById(req.params.id);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createExpenseType,
  getExpenseTypes,
  getExpenseType,
  updateExpenseType,
  deleteExpenseType,
};
