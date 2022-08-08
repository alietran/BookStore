const express = require('express');
const promotionController = require('../controllers/promotionController');

const router = express.Router();

router
  .route('/')
  .post(promotionController.createPromotion)
  .get(promotionController.getAllPromotion);

router
  .route('/:id')
  .delete(promotionController.deletePromotion)
  .get(promotionController.getDetailPromotion)
  .patch(promotionController.updatePromotion);
module.exports = router;
