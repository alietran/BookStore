const ImageRating = require('../models/imageRating');
const factory = require('./handlerFactory');

exports.getAllImageRating = factory.getAll(ImageRating);
