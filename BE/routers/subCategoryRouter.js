const express = require('express');
const subCateController = require('../controllers/subCateController');

const router = express.Router();

router
  .route('/')
  .post(subCateController.createSubCategory)
  .get(subCateController.getAllSubCategory);

module.exports = router;
