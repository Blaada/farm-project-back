const httpStatus = require('http-status');
const { Variety } = require('../models');
const ApiError = require('../utils/ApiError');

const createVariety = async (body) => {
  const variety = await Variety.create(body);
  return variety;
};

const queryVarietys = async (filter, options) => {
  const varietys = await Variety.paginate(filter, options);
  return varietys;
};

const getVarietyById = async (id) => {
  return Variety.findById(id);
};

const updateVarietyById = async (id, updateBody) => {
  const variety = await getVarietyById(id);
  if (!Variety) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Variety not found');
  }
  Object.assign(variety, updateBody);
  await variety.save();
  return variety;
};

const deleteVarietyById = async (id) => {
  const variety = await getVarietyById(id);
  if (!variety) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Variety not found');
  }
  await variety.remove();
  return variety;
};

module.exports = {
  createVariety,
  queryVarietys,
  getVarietyById,
  updateVarietyById,
  deleteVarietyById
};
