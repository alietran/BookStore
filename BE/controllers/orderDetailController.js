const OrderDetail = require('../models/OrderDetail');
const factory = require('../controllers/handlerFactory');

exports.getAllOrderDetail = factory.getAll(OrderDetail);
exports.createOrderDetail = factory.createOne(OrderDetail);
