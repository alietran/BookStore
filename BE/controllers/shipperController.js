const Shipper = require("../models/Shipper");
const factory = require('../controllers/handlerFactory');


exports.getAllShipper = factory.getAll(Shipper);
exports.createShipper = factory.createOne(Shipper);
exports.updateShipper = factory.updateOne(Shipper);
exports.deleteShipper = factory.deleteOne(Shipper);
exports.getDetailShipper = factory.getOne(Shipper);


