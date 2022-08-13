const mongoose = require('mongoose');

const receiptDetailSchema = new mongoose.Schema({
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
});

const ReceiptDetail = mongoose.model('ReceiptDetail', receiptDetailSchema);

module.exports = ReceiptDetail;
