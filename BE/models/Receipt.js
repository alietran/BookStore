const mongoose = require('mongoose');

const receiptSchema = new mongoose.Schema(
  {
    totalPriceReceipt: {
      type: Number,
      required: true,
    },
    adminId: { type: mongoose.Schema.ObjectId, ref: 'Admin' },
    supplierId: { type: mongoose.Schema.ObjectId, ref: 'Supplier' },
    inventoryStatus: {
      type: Boolean,
      default: false,
    },

    createdAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date },
  },
  {
    // timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

receiptSchema.virtual('receiptdetail', {
  ref: 'ReceiptDetail',
  foreignField: 'receiptId',
  localField: '_id',
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
