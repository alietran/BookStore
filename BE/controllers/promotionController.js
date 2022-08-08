const factory = require('../controllers/handlerFactory');
const Promotion = require('../models/Promotion');

const catchAsync = require('../utils/catchAsync');

exports.getDetailPromotion = factory.getOne(Promotion);
exports.updatePromotion = factory.updateOne(Promotion);
exports.deletePromotion = factory.deleteOne(Promotion);
exports.createPromotion = factory.createOne(Promotion);
exports.getAllPromotion = factory.getAll(Promotion);
