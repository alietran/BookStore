const express = require('express');
const imageRatingController = require('../controllers/imageRatingController');

const router = express.Router();

router.route('/').get(imageRatingController.getAllImageRating);

module.exports = router;
