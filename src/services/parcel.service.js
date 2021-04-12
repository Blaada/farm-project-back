const httpStatus = require('http-status');
const { Parcel } = require('../models');
const ApiError = require('../utils/ApiError');

const createParcel = async (body) => {
  const parcel = await Parcel.create(body);
  return parcel;
};

const queryParcels = async (filter, options) => {
  const parcels = await Parcel.paginate(filter, options);
  return parcels;
};

const getParcelById = async (id) => {
  return Parcel.findById(id);
};

const updateParcelById = async (id, updateBody) => {
  const parcel = await getParcelById(id);
  if (!Parcel) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Parcel not found');
  }
  Object.assign(parcel, updateBody);
  await parcel.save();
  return parcel;
};

const deleteParcelById = async (id) => {
  const parcel = await getParcelById(id);
  if (!parcel) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Parcel not found');
  }
  await parcel.remove();
  return parcel;
};

module.exports = {
  createParcel,
  queryParcels,
  getParcelById,
  updateParcelById,
  deleteParcelById
};
