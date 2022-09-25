const express = require('express');
const shipperController = require('../controllers/shipperController');

const router = express.Router();

router.route('/login').post(shipperController.login);
router
  .route('/')
  .post(shipperController.createShipper)
  .get(shipperController.getAllShipper);

router
  .route('/:id')
  .delete(shipperController.deleteShipper)
  .get(shipperController.getDetailShipper)
  .patch(shipperController.updateShipper);
module.exports = router;
