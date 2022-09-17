const express = require('express');
const ratingController = require('../controllers/ratingController');
const authController = require('../controllers/authController');
const router = express.Router({ mergeParams: true });

router.route('/book-rating-detail').get(ratingController.bookRatingDetail);

router
  .route('/')
  .get(ratingController.getAllRating)
  .post(authController.protectUser, ratingController.createRating);

router
  .route('/:id')
  .get(ratingController.getDetailRating)
  .delete(authController.protectUser, ratingController.deleteRating)
  .patch(authController.protectUser, ratingController.likeRating);

module.exports = router;
