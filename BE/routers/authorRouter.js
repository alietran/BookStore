const express = require('express');
const authorController = require('../controllers/authorController');

const router = express.Router();

router
  .route('/')
  .post(authorController.createAuthor)
  .get(authorController.getAllAuthor);

router
  .route('/:id')
  .delete(authorController.deleteAuthor)
  .get(authorController.getDetailAuthor)
  .patch(authorController.updateAuthor);
module.exports = router;
