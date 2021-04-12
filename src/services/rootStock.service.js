const httpStatus = require('http-status');
const { RootStock } = require('../models');
const ApiError = require('../utils/ApiError');

const createRootStock = async (body) => {
  const rootStock = await RootStock.create(body);
  return rootStock;
};

const queryRootStocks = async (filter, options) => {
  const rootStocks = await RootStock.paginate(filter, options);
  return rootStocks;
};

const getRootStockById = async (id) => {
  return RootStock.findById(id);
};

const updateRootStockById = async (id, updateBody) => {
  const rootStock = await getRootStockById(id);
  if (!RootStock) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Root Stock not found');
  }
  Object.assign(rootStock, updateBody);
  await rootStock.save();
  return rootStock;
};

const deleteRootStockById = async (id) => {
  const rootStock = await getRootStockById(id);
  if (!rootStock) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Root Stock not found');
  }
  await rootStock.remove();
  return rootStock;
};

module.exports = {
  createRootStock,
  queryRootStocks,
  getRootStockById,
  updateRootStockById,
  deleteRootStockById
};
