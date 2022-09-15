const express = require('express');
const reviewController = require('../controllers/reviewController');
const authController = require('../controllers/authController');
const router = express.Router({ mergeParams: true });

router
  .route('/book-review-detail')
  .get(reviewController.bookReviewDetail);

router
  .route('/')
  .get(reviewController.getAllReviews)
  .post(authController.protectUser, reviewController.createReview);

router
  .route('/:id')
  .get(reviewController.getDetailReview)
  .delete(authController.protectUser, reviewController.deleteReview)
  .patch(authController.protectUser, reviewController.likeReview);

module.exports = router;
