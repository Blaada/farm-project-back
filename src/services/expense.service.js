const httpStatus = require('http-status');
const moment = require('moment');
const { Expense } = require('../models');
const ApiError = require('../utils/ApiError');

const createExpense = async (body) => {
  const expense = await Expense.create(body);
  return expense;
};

const queryExpenses = async (filter, options) => {
  const expenses = await Expense.paginate(filter, options);
  return expenses;
};
const queryExpensesByMonth = async (month) => {
  let startDate = moment([2021, month - 1]);
  let endDate = moment(startDate).endOf('month');

  const expenses = Expense.aggregate([
    { 
      $match: {
        createDate: { 
          $gte: startDate.toDate(),
          $lt: endDate.toDate()
        },
      }
    }
  ]);
  return expenses;
};
const getExpenseById = async (id) => {
  return Expense.findById(id);
};

const updateExpenseById = async (id, updateBody) => {
  const expense = await getExpenseById(id);
  if (!expense) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Expense not found');
  }
  Object.assign(expense, updateBody);
  await expense.save();
  return expense;
};

const deleteExpenseById = async (id) => {
  const expense = await getExpenseById(id);
  if (!expense) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Expense not found');
  }
  await expense.remove();
  return expense;
};

module.exports = {
  createExpense,
  queryExpenses,
  queryExpensesByMonth,
  getExpenseById,
  updateExpenseById,
  deleteExpenseById
};
