const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  resultCode: {
    type: Number,
  },
  orderId: {
    type: String,
  },
  message: {
    type: String,
  },
  isDefault: {
    type: Boolean,
    default: true,
  },
});

const Payment = mongoose.model('Payment', paymentSchema);
module.exports = { Payment, paymentSchema };
