const express = require('express');
const auth = require('../../middlewares/auth');
const { varietyController } = require('../../controllers');

const router = express.Router();

router
  .route('/')
  .post(auth('admin', 'user'), varietyController.createVariety)
  .get(auth('admin', 'user'), varietyController.getVarietys);

router
  .route('/:id')
  .get(auth('admin', 'user'), varietyController.getVariety)
  .patch(auth('admin', 'user'), varietyController.updateVariety)
  .delete(auth('admin'), varietyController.deleteVariety);

module.exports = router;