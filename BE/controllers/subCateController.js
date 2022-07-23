const factory = require('../controllers/handlerFactory');

const SubCategory = require('../models/SubCategory');

exports.createSubCategory = factory.createOne(SubCategory);
exports.getAllSubCategory = factory.getAll(SubCategory);
