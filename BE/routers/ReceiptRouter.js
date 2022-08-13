const express = require('express');

const receiptController = require('../controllers/receiptController');
const authController = require('../controllers/authController');


const router = express.Router();

router.route('/').get(receiptController.getAllReceipt);

router.post('/', authController.protect, receiptController.createReceipt);
module.exports = router;
