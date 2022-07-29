const Admin = require('../models/Admin');
const factory = require('../controllers/handlerFactory');

exports.getAllUsers = factory.getAll(Admin);
exports.createUser = factory.createOne(Admin);
exports.updateUser = factory.updateOne(Admin);
exports.deleteUser = factory.deleteOne(Admin);
exports.getDetailUser = factory.getOne(Admin);