const Payment = require('../models/Payment');
const factory = require('../controllers/handlerFactory');

exports.getAllPayment = factory.getAll(Payment);
exports.createPayment = factory.createOne(Payment);
