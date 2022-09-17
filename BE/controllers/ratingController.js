const Rating = require('../models/ratingModel');
const factory = require('./handlerFactory');
const catchAsync = require('../utils/catchAsync');

exports.getAllRating = factory.getAll(Rating);
exports.getDetailRating = factory.getOne(Rating);
exports.createRating = catchAsync(async (req, res, next) => {
  const rating = await Rating.insertMany(req.body);

  res.status(201).json({
    status: 'success',
    result: rating.length,
    data: rating,
  });
});

exports.bookRatingDetail = catchAsync(async (req, res, next) => {
  const { bookId } = req.query;
  console.log('bookId', bookId);

  const doc = await Rating.find({ book: bookId });

  if (!doc) {
    return next(new AppError('No document found with that ID', 404));
  }

  res.status(201).json({
    status: 'success',
    result: doc.length,
    data: doc,
  });
});
exports.likeRating = factory.updateOne(Rating);
exports.deleteRating = factory.deleteOne(Rating);
