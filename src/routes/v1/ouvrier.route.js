const express = require('express');
const auth = require('../../middlewares/auth');
const { ouvrierController } = require('../../controllers');

const router = express.Router();

router
  .route('/')
  .post(auth('admin', 'user'), ouvrierController.createOuvrier)
  .get(auth('admin', 'user'), ouvrierController.getOuvriers);

router
  .route('/:id')
  .get(auth('admin', 'user'), ouvrierController.getOuvrier)
  .patch(auth('admin', 'user'), ouvrierController.updateOuvrier)
  .delete(auth('admin'), ouvrierController.deleteOuvrier);

module.exports = router;