const mongoose = require('mongoose');
const ratingSchema = new mongoose.Schema(
  {
    order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' },
    book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    likes: {
      type: Number,
      default: 0,
    },
    content: {
      type: String,
    },
    userLikeThisComment: [],
    image: {
      type: Array,
    },
    active: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

ratingSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'order',
  }).populate({
    path: 'book',
  });
  next();
});

const Rating = mongoose.model('Rating', ratingSchema);

module.exports = Rating;
