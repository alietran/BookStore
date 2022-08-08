const mongoose = require('mongoose');

const promotionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please tell us promotion name'],
      trim: true,
    },
    percent_discount: {
      type: String,
    },
    price_discount: {
      type: String,
    },
    desc: {
      type: String,
    },
    endDate: {
      type: Date,
      required: [true, 'Please tell us end date'],
    },
    code: {
      type: String,
      required: [true, 'Please tell us code'],
      trim: true,
    },
  },
  {
    toJSON: { virtuals: true }, 
    toObject: { virtuals: true },
  }
);

const Promotion = mongoose.model('Promotion', promotionSchema);
// categorySchema.virtual('categorys', {
//   ref: 'SubCategory',
//   foreignField: 'categoryId',
//   localField: '_id',
// });

module.exports = Promotion;
