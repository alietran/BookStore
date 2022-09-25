const mongoose = require('mongoose');
var validator = require('validator');
const bcrypt = require('bcryptjs');
const shipperSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please tell us category'],
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Please tell us password'],
    },
    phoneNumber: {
      type: String,
      unique: true,
      required: [true, 'Please provide your phoneNumber'],
      validate: {
        validator: function (number) {
          return /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/.test(
            number
          );
        },
        message: (props) => `${props.value} is not a valid phone number!`,
      },
    },
    gender: {
      type: String,
      required: [true, 'Please tell us your gender'],
      enum: ['Nam', 'Nữ'],
      // allowNull: true,
    },
    email: {
      type: String,
      required: [true, 'Please provide your email'],
      unique: true,
      // chuyển về chữ thường
      lowercase: true,
      // check email
      validate: [validator.isEmail, 'Please provide a valid email'],
    },
    dateOfBirth: {
      type: Date,
      required: [true, 'Please provide your date of birth'],
      // allowNull: true,
    },

    license_plates: {
      type: String,
      required: [true, 'Please provide your license plates'],
      // allowNull: true,
    },
    avatar: {
      type: String,
    },
    role: {
      type: String,
      default: 'Shipper',
    },
    address: {
      type: String,
      required: [true, 'Please provide your address'],
    },
    active: {
      type: Boolean,
      default: true,
      // select: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
// DOCUMENT MIDDLEWARE: runs before .save() and .create()
shipperSchema.pre('save', async function (next) {
  // Only run this function if password was actually modified
  if (!this.isModified('password')) return next();

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  // Delete passwordConfirm field
  this.passwordConfirm = undefined;
  next();
});

shipperSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const Shipper = mongoose.model('Shipper', shipperSchema);
// categorySchema.virtual('categorys', {
//   ref: 'SubCategory',
//   foreignField: 'categoryId',
//   localField: '_id',
// });

module.exports = Shipper;
