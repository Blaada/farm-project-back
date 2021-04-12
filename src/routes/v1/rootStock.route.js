const express = require('express');
const auth = require('../../middlewares/auth');
const { rootStockController } = require('../../controllers');

const router = express.Router();

router
  .route('/')
  .post(auth('admin', 'user'), rootStockController.createRootStock)
  .get(auth('admin', 'user'), rootStockController.getRootStocks);

router
  .route('/:id')
  .get(auth('admin', 'user'), rootStockController.getRootStock)
  .patch(auth('admin', 'user'), rootStockController.updateRootStock)
  .delete(auth('admin'), rootStockController.deleteRootStock);

module.exports = router;