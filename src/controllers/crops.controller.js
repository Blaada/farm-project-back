const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { cropService } = require('../services');

const createCrop = catchAsync(async (req, res) => {
  const crop = await cropService.createCrop(req.body);
  res.status(httpStatus.CREATED).send(crop);
});

const getCrops = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['cropType', 'cropParcel', 'cropVariety', 'cropCaliber', 'cropRootStock']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await cropService.queryCrops(filter, options);
  res.send(result);
});

const getCropsByPeriod = catchAsync(async (req,res) => {
  const period = req.params.period;
  const result = await cropService.queryCropsByPeriod(period);
  res.send(result);
});

const getCrop = catchAsync(async (req, res) => {
  const crop = await cropService.getCropById(req.params.id);
  if (!crop) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Crop not found');
  }
  res.send(crop);
});

const updateCrop = catchAsync(async (req, res) => {
  const crop = await cropService.updateCropById(req.params.id, req.body);
  res.send(crop);
});

const deleteCrop = catchAsync(async (req, res) => {
  await cropService.deleteCropById(req.params.id);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createCrop,
  getCrops,
  getCropsByPeriod,
  getCrop,
  updateCrop,
  deleteCrop,
};
