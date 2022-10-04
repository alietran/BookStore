const express = require('express');

const receiptController = require('../controllers/receiptController');
const authController = require('../controllers/authController');

const router = express.Router();

router.route('/').get(receiptController.getAllReceipt);

router.post('/', authController.protect, receiptController.createReceipt);

router
  .route('/receiptRevenueStatisticsForWeek')
  .get(receiptController.receiptRevenueStatisticsForWeek);
router
  .route('/receiptRevenueStatisticsForYear')
  .get(receiptController.receiptRevenueStatisticsForYear);
  
router
  .route('/receiptRevenueStatisticsForMonth')
  .get(receiptController.receiptRevenueStatisticsForMonth);

router
  .route('/:id')
  .get(receiptController.getDetailReceipt)
  .patch(receiptController.updateReceipt);

module.exports = router;
