const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { rootStockService } = require('../services');

const createRootStock = catchAsync(async (req, res) => {
  const rootStock = await rootStockService.createRootStock(req.body);
  res.status(httpStatus.CREATED).send(rootStock);
});

const getRootStocks = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await rootStockService.queryRootStocks(filter, options);
  res.send(result);
});

const getRootStock = catchAsync(async (req, res) => {
  const rootStock = await rootStockService.getRootStockById(req.params.id);
  if (!rootStock) {
    throw new ApiError(httpStatus.NOT_FOUND, 'RootStock not found');
  }
  res.send(rootStock);
});

const updateRootStock = catchAsync(async (req, res) => {
  const rootStock = await rootStockService.updateRootStockById(req.params.id, req.body);
  res.send(rootStock);
});

const deleteRootStock = catchAsync(async (req, res) => {
  await rootStockService.deleteRootStockById(req.params.id);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createRootStock,
  getRootStocks,
  getRootStock,
  updateRootStock,
  deleteRootStock,
};
