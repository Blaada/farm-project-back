const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { parcelService } = require('../services');

const createParcel = catchAsync(async (req, res) => {
  const parcel = await parcelService.createParcel(req.body);
  res.status(httpStatus.CREATED).send(parcel);
});

const getParcels = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await parcelService.queryParcels(filter, options);
  res.send(result);
});

const getParcel = catchAsync(async (req, res) => {
  const parcel = await parcelService.getParcelById(req.params.id);
  if (!parcel) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Parcel not found');
  }
  res.send(parcel);
});

const updateParcel = catchAsync(async (req, res) => {
  const parcel = await parcelService.updateParcelById(req.params.id, req.body);
  res.send(parcel);
});

const deleteParcel = catchAsync(async (req, res) => {
  await parcelService.deleteParcelById(req.params.id);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createParcel,
  getParcels,
  getParcel,
  updateParcel,
  deleteParcel,
};
