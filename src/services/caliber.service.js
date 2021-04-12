const httpStatus = require('http-status');
const { Caliber } = require('../models');
const ApiError = require('../utils/ApiError');

const createCaliber = async (body) => {
  const caliber = await Caliber.create(body);
  return caliber;
};

const queryCalibers = async (filter, options) => {
  const calibers = await Caliber.paginate(filter, options);
  return calibers;
};

const getCaliberById = async (id) => {
  return Caliber.findById(id);
};

const updateCaliberById = async (id, updateBody) => {
  const caliber = await getCaliberById(id);
  if (!Caliber) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Calibre not found');
  }
  Object.assign(caliber, updateBody);
  await caliber.save();
  return caliber;
};

const deleteCaliberById = async (id) => {
  const caliber = await getCaliberById(id);
  if (!caliber) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Calibre not found');
  }
  await caliber.remove();
  return caliber;
};

module.exports = {
  createCaliber,
  queryCalibers,
  getCaliberById,
  updateCaliberById,
  deleteCaliberById
};
