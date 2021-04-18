const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { outgoingService } = require('../services');

const createOutgoing = catchAsync(async (req, res) => {
  const outgoing = await outgoingService.createOutgoing(req.body);
  res.status(httpStatus.CREATED).send(outgoing);
});

const getOutgoings = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await outgoingService.queryOutgoings(filter, options);
  res.send(result);
});
const getOutgoingsCountByMonth = catchAsync(async (req, res) => {
  const count = await outgoingService.outgoingsCountByMonth();
  res.send(count);
});
const getOutgoing = catchAsync(async (req, res) => {
  const outgoing = await outgoingService.getOutgoingById(req.params.id);
  if (!outgoing) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Outgoing not found');
  }
  res.send(outgoing);
});

const updateOutgoing = catchAsync(async (req, res) => {
  const outgoing = await outgoingService.updateOutgoingById(req.params.id, req.body);
  res.send(outgoing);
});

const deleteOutgoing = catchAsync(async (req, res) => {
  await outgoingService.deleteOutgoingById(req.params.id);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createOutgoing,
  getOutgoings,
  getOutgoingsCountByMonth,
  getOutgoing,
  updateOutgoing,
  deleteOutgoing,
};
