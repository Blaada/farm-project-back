const express = require('express');
const auth = require('../../middlewares/auth');
const { outgoingController } = require('../../controllers');

const router = express.Router();

router
  .route('/')
  .post(auth('admin', 'user'), outgoingController.createOutgoing)
  .get(auth('admin', 'user'), outgoingController.getOutgoings);


router.get('/countByMonth',auth('admin','user'),outgoingController.getOutgoingsCountByMonth)
router
  .route('/:id')
  .get(auth('admin', 'user'), outgoingController.getOutgoing)
  .patch(auth('admin', 'user'), outgoingController.updateOutgoing)
  .delete(auth('admin'), outgoingController.deleteOutgoing);

module.exports = router;