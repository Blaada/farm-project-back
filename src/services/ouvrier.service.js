const httpStatus = require('http-status');
const { Ouvrier } = require('../models');
const ApiError = require('../utils/ApiError');

const createOuvrier = async (body) => {
  const ouvier = await Ouvrier.create(body);
  return ouvier;
};

const queryOuvriers = async (filter, options) => {
  const ouviers = await Ouvrier.paginate(filter, options);
  return ouviers;
};

const getOuvrierById = async (id) => {
  return Ouvrier.findById(id);
};

const updateOuvrierById = async (id, updateBody) => {
  const ouvier = await getOuvrierById(id);
  if (!Ouvrier) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Ouvrier not found');
  }
  Object.assign(ouvier, updateBody);
  await ouvier.save();
  return ouvier;
};

const deleteOuvrierById = async (id) => {
  const ouvier = await getOuvrierById(id);
  if (!ouvier) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Ouvrier not found');
  }
  await ouvier.remove();
  return ouvier;
};

module.exports = {
  createOuvrier,
  queryOuvriers,
  getOuvrierById,
  updateOuvrierById,
  deleteOuvrierById
};
