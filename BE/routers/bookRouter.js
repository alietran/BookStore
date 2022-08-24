const express = require('express');
const bookController = require('../controllers/bookController');

const router = express.Router();

router
  .route('/')
  .post(bookController.uploadBookPhoto, bookController.createBook)
  .get(bookController.getAllBook);

router
  .route('/:id')
  .delete(bookController.deleteBook)
  .get(bookController.getDetailBook)
  .patch(bookController.uploadBookPhoto, bookController.updateBook);
module.exports = router;
