const factory = require('../controllers/handlerFactory');
const Author = require('../models/Author');

const catchAsync = require('../utils/catchAsync');

exports.getDetailAuthor = factory.getOne(Author);
exports.updateAuthor = factory.updateOne(Author);
exports.deleteAuthor = factory.deleteOne(Author);
exports.createAuthor = factory.createOne(Author);
exports.getAllAuthor = factory.getAll(Author);
