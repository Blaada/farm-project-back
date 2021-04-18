const httpStatus = require('http-status');
const moment = require('moment');
const { Crops } = require('../models');
const ApiError = require('../utils/ApiError');
const createCrop = async (body) => {
  const crop = await Crops.create(body);
  return crop;
};

const queryCrops = async (filter, options) => {
  const crops = await Crops.paginate(filter, options);
  return crops;
};

const queryCropsByPeriod = async (period) => {
  const crops = Crops.aggregate([
    { 
      $match: {
        createDate: { 
          $gte: moment().startOf(`${period}`).toDate(),
          $lt: moment().endOf(`${period}`).toDate()
        },
      }
    }
  ]);
  return crops;
}

const getCropById = async (id) => {
  return Crops.findById(id);
};

const updateCropById = async (id, updateBody) => {
  const crop = await getCropById(id);
  if (!crop) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Crop not found');
  }
  Object.assign(crop, updateBody);
  await crop.save();
  return crop;
};

const deleteCropById = async (id) => {
  const crop = await getCropById(id);
  if (!crop) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Crop not found');
  }
  await crop.remove();
  return crop;
};

module.exports = {
  createCrop,
  queryCrops,
  queryCropsByPeriod,
  getCropById,
  updateCropById,
  deleteCropById
};
