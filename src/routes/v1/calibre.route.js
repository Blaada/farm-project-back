const express = require('express');
const auth = require('../../middlewares/auth');
const { caliberController } = require('../../controllers');

const router = express.Router();

router
  .route('/')
  .post(auth('admin'), caliberController.createCaliber)
  .get(auth('admin'), caliberController.getCalibers);

router
  .route('/:id')
  .get(auth('admin'), caliberController.getCaliber)
  .patch(auth('admin'), caliberController.updateCaliber)
  .delete(auth('admin'), caliberController.deleteCaliber);

module.exports = router;