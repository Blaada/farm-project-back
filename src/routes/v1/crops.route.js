const express = require('express');
const auth = require('../../middlewares/auth');
const { cropsController } = require('../../controllers');

const router = express.Router();

router
  .route('/')
  .post(auth('admin', 'user'), cropsController.createCrop)
  .get(auth('admin', 'user'), cropsController.getCrops);

router
  .route('/period/:period')
  .get(auth('admin','user'), cropsController.getCropsByPeriod)

router
  .route('/:id')
  .get(auth('admin', 'user'), cropsController.getCrop)
  .patch(auth('admin', 'user'), cropsController.updateCrop)
  .delete(auth('admin'), cropsController.deleteCrop);

module.exports = router;