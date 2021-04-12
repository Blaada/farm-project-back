const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { caliberService } = require('../services');

const createCaliber = catchAsync(async (req, res) => {
  const caliber = await caliberService.createCaliber(req.body);
  res.status(httpStatus.CREATED).send(caliber);
});

const getCalibers = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['caliber']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await caliberService.queryCalibers(filter, options);
  res.send(result);
});

const getCaliber = catchAsync(async (req, res) => {
  const caliber = await caliberService.getCaliberById(req.params.id);
  if (!caliber) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Caliber not found');
  }
  res.send(caliber);
});

const updateCaliber = catchAsync(async (req, res) => {
  const caliber = await caliberService.updateCaliberById(req.params.id, req.body);
  res.send(caliber);
});

const deleteCaliber = catchAsync(async (req, res) => {
  await caliberService.deleteCaliberById(req.params.id);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createCaliber,
  getCalibers,
  getCaliber,
  updateCaliber,
  deleteCaliber,
};
