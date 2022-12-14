const express = require('express');
const authController = require('../controllers/authController');
const orderController = require('../controllers/orderController');
const router = express.Router();

router.post('/', authController.protectUser, orderController.createOrder);

router.route('/').get(orderController.getAllOrder);
router.get('/orderList', authController.protectUser, orderController.getAllTicketByUser);

router.route('/orderByBookForYear/:id').post(orderController.orderByBookForYear);
router
  .route('/orderByBookForMonth/:id')
  .post(orderController.orderByBookForMonth);
;

router
  .route('/orderRevenueStatisticsForWeek')
  .get(orderController.orderRevenueStatisticsForWeek);
router
  .route('/orderRevenueStatisticsForYear')
  .get(orderController.orderRevenueStatisticsForYear);
router
  .route('/orderRevenueStatisticsForMonth')
  .get(orderController.orderRevenueStatisticsForMonth);

router
  .route('/:id')
  .get(orderController.getDetailOrder)
  .patch(orderController.updateOrder);

module.exports = router;
