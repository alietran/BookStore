const mongoose = require('mongoose');

const orderDetailSchema = new mongoose.Schema({
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
  order: {
    type: mongoose.Schema.ObjectId,
    ref: 'Order',
  },
  book: {
    type: mongoose.Schema.ObjectId,
    ref: 'Book',
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updateAt: {
    type: Date,
    default: Date.now(),
  },
});

orderDetailSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'book',
  }).populate({
    path: 'order',
  });

  next();
});

const OrderDetail = mongoose.model('OrderDetail', orderDetailSchema);
module.exports = OrderDetail;
