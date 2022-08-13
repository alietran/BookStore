const mongoose = require('mongoose');

const receiptSchema = new mongoose.Schema({
  totalPriceReceipt: {
    type: Number,
    required: true,
  },
  adminId: { type: mongoose.Schema.ObjectId, ref: 'Admin' },
  supplierId: { type: mongoose.Schema.ObjectId, ref: 'Supplier' },
});

receiptSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'supplierId',
    select: 'name phoneNumber address',
  }).populate({
    path: 'adminId',
    select: 'fullName phoneNumber',
  });

  next();
});

const Receipt = mongoose.model('Receipt', receiptSchema);

module.exports = Receipt;
