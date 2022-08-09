const factory = require('../controllers/handlerFactory');
const Book = require('../models/Book');
const catchAsync = require('../utils/catchAsync');

exports.getDetailBook = factory.getOne(Book);
exports.updateBook = factory.updateOne(Book);
exports.deleteBook = factory.deleteOne(Book);
exports.createBook = factory.createOne(Book);
exports.getAllBook = factory.getAll(Book);
