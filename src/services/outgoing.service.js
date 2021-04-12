const httpStatus = require('http-status');
const { Outgoing } = require('../models');
const ApiError = require('../utils/ApiError');

const createOutgoing = async (body) => {
  const outgoing = await Outgoing.create(body);
  return outgoing;
};

const queryOutgoings = async (filter, options) => {
  const outgoings = await Outgoing.paginate(filter, options);
  return outgoings;
};

const getOutgoingById = async (id) => {
  return Outgoing.findById(id);
};

const updateOutgoingById = async (id, updateBody) => {
  const outgoing = await getOutgoingById(id);
  if (!Outgoing) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Outgoing not found');
  }
  Object.assign(outgoing, updateBody);
  await outgoing.save();
  return outgoing;
};

const deleteOutgoingById = async (id) => {
  const outgoing = await getOutgoingById(id);
  if (!outgoing) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Outgoing not found');
  }
  await outgoing.remove();
  return outgoing;
};

module.exports = {
  createOutgoing,
  queryOutgoings,
  getOutgoingById,
  updateOutgoingById,
  deleteOutgoingById
};
