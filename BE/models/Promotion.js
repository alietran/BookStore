const mongoose = require('mongoose');

const promotionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'A discount must have a title'],
    },
    price: {
      type: String,
      required: [true, 'A discount must have a price'],
    },
    miniPrice: {
      type: String,
    }, 
    code: {
      type: String,
      required: [true, 'A discount must have a code'],
    },
    startDate: {
      type: Date,
      required: [true, 'A discount must have a startDate'],
      trim: true,
    },
    expiryDate: {
      type: Date,
      required: [true, 'A discount must have a expiryDate'],
      trim: true,
    },
  
    activeCode: {
      type: String,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Promotion = mongoose.model('Promotion', promotionSchema);

module.exports = Promotion;
