const mongoose = require('mongoose');
const { paymentSchema } = require('./Payment');

const orderSchema = new mongoose.Schema(
  {
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
    paymentMethod: paymentSchema,
    admin: {
      type: mongoose.Schema.ObjectId,
      ref: 'Admin',
    },
    promotion: {
      type: mongoose.Schema.ObjectId,
      ref: 'Promotion',
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
    shipper: {
      type: mongoose.Schema.ObjectId,
      ref: 'Shipper',
    },
    // createdAt: {
    //   type: Date,
    //   default: Date.now(),
    // },
    // updateAt: {
    //   type: Date,
    //   default: Date.now(),
    // },
    notes: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

orderSchema.virtual('orderDetail', {
  ref: 'OrderDetail',
  foreignField: 'order',
  localField: '_id',
});

orderSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'fullName phoneNumber email',
  })
    .populate({
      path: 'promotion',
    })
    .populate({
      path: 'shipper',
    });

  next();
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
