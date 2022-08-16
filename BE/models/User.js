const mongoose = require('mongoose');
var validator = require('validator');
var findOrCreate = require('mongoose-findorcreate');

const UserSchema = new mongoose.Schema({
  fullName: {
    type: String,
    // required: [true, 'Please tell us your fullName'],
    trim: true,
  },
  phoneNumber: {
    type: String,
    allowNull: true,
  },
  gender: {
    type: String,
    // required: [true, 'Please tell us your gender'],
    // enum: ['Nam', 'Nữ'],
    allowNull: true,
  },
  email: {
    type: String,
    // required: [true, 'Please provide your email'],
    // unique: true,
    // chuyển về chữ thường
    lowercase: true,
    // check email
  },
  dateOfBirth: {
    type: Date,
    allowNull: true,
  },
  avatar: {
    type: String,
  },
  idRole: {
    roleName: {
      type: String,
      default: 'Khách Hàng',
    },
  },
  address: {
    type: String,
    allowNull: true,
  },
  googleId: {
    type: String,
    allowNull: true,
  },
  facebookId: {
    type: String,
    allowNull: true,
  },
  phoneUID: {
    type: String,
  },
  passwordChangeAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  active: {
    type: Boolean,
    default: true,
  },
});

UserSchema.plugin(findOrCreate);

const User = mongoose.model('User', UserSchema);
module.exports = User;
