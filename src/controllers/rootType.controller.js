const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { rootTypeService } = require('../services');

const createRootType = catchAsync(async (req, res) => {
  const rootType = await rootTypeService.createRootType(req.body);
  res.status(httpStatus.CREATED).send(rootType);
});

const getRootTypes = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await rootTypeService.queryRootTypes(filter, options);
  res.send(result);
});

const getRootType = catchAsync(async (req, res) => {
  const rootType = await rootTypeService.getRootTypeById(req.params.id);
  if (!rootType) {
    throw new ApiError(httpStatus.NOT_FOUND, 'RootType not found');
  }
  res.send(rootType);
});

const updateRootType = catchAsync(async (req, res) => {
  const rootType = await rootTypeService.updateRootTypeById(req.params.id, req.body);
  res.send(rootType);
});

const deleteRootType = catchAsync(async (req, res) => {
  await rootTypeService.deleteRootTypeById(req.params.id);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createRootType,
  getRootTypes,
  getRootType,
  updateRootType,
  deleteRootType,
};
