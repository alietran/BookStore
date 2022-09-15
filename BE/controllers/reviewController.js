const Review = require('../models/reviewModel');
const factory = require('../controllers/handlerFactory');
const catchAsync = require('../utils/catchAsync');

exports.getAllReviews = factory.getAll(Review);
exports.getDetailReview = factory.getOne(Review);
exports.createReview = catchAsync(async (req, res, next) => {
  const review = await Review.insertMany(req.body);

  res.status(201).json({
    status: 'success',
    result: review.length,
    data: review,
  });
});

exports.bookReviewDetail = catchAsync(async (req, res, next) => {
  const { bookId } = req.query;
  console.log('bookId', bookId);

  const doc = await Review.find({ book: bookId });

  if (!doc) {
    return next(new AppError('No document found with that ID', 404));
  }

  res.status(201).json({
    status: 'success',
    result: doc.length,
    data: doc,
  });
});
exports.likeReview = factory.updateOne(Review);
exports.deleteReview = factory.deleteOne(Review);
