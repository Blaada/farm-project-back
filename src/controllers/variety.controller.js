const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { varietyService } = require('../services');

const createVariety = catchAsync(async (req, res) => {
  const variety = await varietyService.createVariety(req.body);
  res.status(httpStatus.CREATED).send(variety);
});

const getVarietys = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await varietyService.queryVarietys(filter, options);
  res.send(result);
});

const getVariety = catchAsync(async (req, res) => {
  const variety = await varietyService.getVarietyById(req.params.id);
  if (!variety) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Variety not found');
  }
  res.send(variety);
});

const updateVariety = catchAsync(async (req, res) => {
  const variety = await varietyService.updateVarietyById(req.params.id, req.body);
  res.send(variety);
});

const deleteVariety = catchAsync(async (req, res) => {
  await varietyService.deleteVarietyById(req.params.id);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createVariety,
  getVarietys,
  getVariety,
  updateVariety,
  deleteVariety,
};
