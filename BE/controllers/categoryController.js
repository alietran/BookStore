const factory = require('../controllers/handlerFactory');
const Category = require('../models/Category');

exports.getDetailCategory = factory.getOne(Category);
exports.updateCategory = factory.updateOne(Category);

exports.deleteCategory = factory.deleteOne(Category);
exports.createCategory = factory.createOne(Category);
exports.getAllCategory = factory.getAll(Category, { path: 'subcategorys' });
