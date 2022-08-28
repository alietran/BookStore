const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  totalPrice: {
    type: Number,
    required: true,
  },
  address: {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
    district: {
      type: String,
      required: true,
      trim: true,
    },
    ward: {
      type: String,
      required: true,
      trim: true,
    },
    isDefault: {
      type: Boolean,
      default: true,
    },
  },
  status: {
    type: String,
    default: 'Đang xử lý',
  },
  paymentMethod: {
    type: mongoose.Schema.ObjectId,
    ref: 'Payment',
  },
  admin: {
    type: mongoose.Schema.ObjectId,
    ref: 'Admin',
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  shipper: {
    type: mongoose.Schema.ObjectId,
    ref: 'Shipper',
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updateAt: {
    type: Date,
    default: Date.now(),
  },
  notes: {
    type: String,
    default: '',
  },
});

orderSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'paymentMethod',
  }).populate({
    path: 'user',
    select: 'fullName phoneNumber email',
  });

  next();
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
