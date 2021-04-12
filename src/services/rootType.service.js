const httpStatus = require('http-status');
const { RootType } = require('../models');
const ApiError = require('../utils/ApiError');

const createRootType = async (body) => {
  const rootType = await RootType.create(body);
  return rootType;
};

const queryRootTypes = async (filter, options) => {
  const rootTypes = await RootType.paginate(filter, options);
  return rootTypes;
};

const getRootTypeById = async (id) => {
  return RootType.findById(id);
};

const updateRootTypeById = async (id, updateBody) => {
  const rootType = await getRootTypeById(id);
  if (!RootType) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Root Type not found');
  }
  Object.assign(rootType, updateBody);
  await rootType.save();
  return rootType;
};

const deleteRootTypeById = async (id) => {
  const rootType = await getRootTypeById(id);
  if (!rootType) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Root Type not found');
  }
  await rootType.remove();
  return rootType;
};

module.exports = {
  createRootType,
  queryRootTypes,
  getRootTypeById,
  updateRootTypeById,
  deleteRootTypeById
};
