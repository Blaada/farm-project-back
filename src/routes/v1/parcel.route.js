const express = require('express');
const auth = require('../../middlewares/auth');
const { parcelController } = require('../../controllers');

const router = express.Router();

router
  .route('/')
  .post(auth('admin', 'user'), parcelController.createParcel)
  .get(auth('admin', 'user'), parcelController.getParcels);

router
  .route('/:id')
  .get(auth('admin', 'user'), parcelController.getParcel)
  .patch(auth('admin', 'user'), parcelController.updateParcel)
  .delete(auth('admin'), parcelController.deleteParcel);

module.exports = router;