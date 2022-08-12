const express = require('express');
const addressController = require('../controllers/addressController');
const authController = require('../controllers/authController');

const router = express.Router();

router
  .route('/')
  //   .post(addressController.createAddress)
  .get(addressController.getAllAddress);

router.post('/', authController.protect, addressController.createAddress);
router.get(
  '/getDetall',
  authController.protect,
  addressController.getDetailAddress
);

router
  .route('/:id')
  .delete(addressController.deleteAddress)
//   .get(addressController.getDetailAddress)
  .patch(addressController.updateAddress);
module.exports = router;
