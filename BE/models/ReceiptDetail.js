const mongoose = require('mongoose');

const receiptDetailSchema = new mongoose.Schema(
  {
    amount: { type: Number, required: true },
    price: { type: Number, required: true },
    totalPriceReceiptDetail: {
      type: Number,
      required: true,
    },
    receiptId: {
      type: mongoose.Schema.ObjectId,
      ref: 'Receipt',
    },
    bookId: {
      type: mongoose.Schema.ObjectId,
      ref: 'Book',
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

receiptDetailSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'bookId',
  }).populate({
    path: 'receiptId',
  });

  next();
});
const ReceiptDetail = mongoose.model('ReceiptDetail', receiptDetailSchema);

module.exports = ReceiptDetail;
