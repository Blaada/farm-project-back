const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { ouvrierService } = require('../services');

const createOuvrier = catchAsync(async (req, res) => {
  const ouvrier = await ouvrierService.createOuvrier(req.body);
  res.status(httpStatus.CREATED).send(ouvrier);
});

const getOuvriers = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await ouvrierService.queryOuvriers(filter, options);
  res.send(result);
});

const getOuvrier = catchAsync(async (req, res) => {
  const ouvrier = await ouvrierService.getOuvrierById(req.params.id);
  if (!ouvrier) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Ouvrier not found');
  }
  res.send(ouvrier);
});

const updateOuvrier = catchAsync(async (req, res) => {
  const ouvrier = await ouvrierService.updateOuvrierById(req.params.id, req.body);
  res.send(ouvrier);
});

const deleteOuvrier = catchAsync(async (req, res) => {
  await ouvrierService.deleteOuvrierById(req.params.id);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createOuvrier,
  getOuvriers,
  getOuvrier,
  updateOuvrier,
  deleteOuvrier,
};
