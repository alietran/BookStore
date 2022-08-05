const factory = require('../controllers/handlerFactory');
const Supplier = require('../models/Supplier');
const catchAsync = require('../utils/catchAsync');

exports.getDetailSupplier = factory.getOne(Supplier);
exports.updateSupplier = factory.updateOne(Supplier);
exports.deleteSupplier = factory.deleteOne(Supplier);
exports.createSupplier = factory.createOne(Supplier);
exports.getAllSupplier = factory.getAll(Supplier);
