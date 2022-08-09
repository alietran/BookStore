const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please tell us  name'],
      trim: true,
    },
    desc: {
      type: String,
      required: [true, 'Please tell us  desc'],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Please tell us price'],
    },
    quantity: {
      type: Number,
      required: [true, 'Please tell us quantity'],
      trim: true,
    },
    bookCover: {
      type: String,
      required: [true, 'Please tell us bookCover'],
      trim: true,
    },
    totalPage: {
      type: Number,
      required: [true, 'Please tell us totalPage'],
      trim: true,
    },

    publisher: {
      type: String,
      required: [true, 'Please tell us publisher'],
      trim: true,
    },
    issuer: {
      type: String,
      required: [true, 'Please tell us issuer'],
      trim: true,
    },
    size: {
      type: String,
      required: [true, 'Please tell us size'],
      trim: true,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Book = mongoose.model('Book', bookSchema);


module.exports = Book;
