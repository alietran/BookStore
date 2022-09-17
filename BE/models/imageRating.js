const mongoose = require('mongoose');
const imageRatingSchema = new mongoose.Schema(
  {
    rating: { type: mongoose.Schema.Types.ObjectId, ref: 'Rating' },
    imageRating: {
      type: Array,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const ImageRating = mongoose.model('ImageRating', imageRatingSchema);

module.exports = ImageRating;
