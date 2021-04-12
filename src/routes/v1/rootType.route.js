const express = require('express');
const auth = require('../../middlewares/auth');
const { rootTypeController } = require('../../controllers');

const router = express.Router();

router
  .route('/')
  .post(auth('admin', 'user'), rootTypeController.createRootType)
  .get(auth('admin', 'user'), rootTypeController.getRootTypes);

router
  .route('/:id')
  .get(auth('admin', 'user'), rootTypeController.getRootType)
  .patch(auth('admin', 'user'), rootTypeController.updateRootType)
  .delete(auth('admin'), rootTypeController.deleteRootType);

module.exports = router;