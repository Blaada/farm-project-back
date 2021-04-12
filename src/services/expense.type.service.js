const httpStatus = require('http-status');
const { ExpenseType } = require('../models');
const ApiError = require('../utils/ApiError');

const createExpenseType = async (body) => {
  const expenseType = await ExpenseType.create(body);
  return expenseType;
};

const queryExpenseTypes = async (filter, options) => {
  const expenseTypes = await ExpenseType.paginate(filter, options);
  return expenseTypes;
};

const getExpenseTypeById = async (id) => {
  return ExpenseType.findById(id);
};

const updateExpenseTypeById = async (id, updateBody) => {
  const expenseType = await getExpenseTypeById(id);
  if (!ExpenseType) {
    throw new ApiError(httpStatus.NOT_FOUND, 'ExpenseType not found');
  }
  Object.assign(expenseType, updateBody);
  await expenseType.save();
  return expenseType;
};

const deleteExpenseTypeById = async (id) => {
  const expenseType = await getExpenseTypeById(id);
  if (!expenseType) {
    throw new ApiError(httpStatus.NOT_FOUND, 'ExpenseType not found');
  }
  await expenseType.remove();
  return expenseType;
};

module.exports = {
  createExpenseType,
  queryExpenseTypes,
  getExpenseTypeById,
  updateExpenseTypeById,
  deleteExpenseTypeById
};
