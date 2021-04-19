const express = require('express');
const auth = require('../../middlewares/auth');
const { cropsController } = require('../../controllers');

const router = express.Router();

router
  .route('/')
  .post(cropsController.createCrop)
  .get(cropsController.getCrops);

router
  .route('/:id')
  .get(cropsController.getCrop)
  .patch(cropsController.updateCrop)
  .delete(cropsController.deleteCrop);

module.exports = router;