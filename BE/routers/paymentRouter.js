const express = require('express');

const paymentController = require('../controllers/paymentController');
const router = express.Router();

router
  .route('/')
  .get(paymentController.getAllPayment)
  .post(paymentController.createPayment);

module.exports = router;
