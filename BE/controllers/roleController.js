const Role = require('../models/Role');
const factory = require('../controllers/handlerFactory');

exports.getAllRole = factory.getAll(Role);
exports.createRole = factory.createOne(Role);
