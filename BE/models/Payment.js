const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  status: {
    type: String,
    default: '',
  },
});

const Payment = mongoose.model('Payment', paymentSchema);
module.exports = Payment;
