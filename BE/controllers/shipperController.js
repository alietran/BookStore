const Shipper = require("../models/Shipper");
const factory = require('../controllers/handlerFactory');
const catchAsync = require("../utils/catchAsync");
const AppError = require('../utils/appError');
const jwt = require('jsonwebtoken');
exports.getAllShipper = factory.getAll(Shipper);
exports.createShipper = factory.createOne(Shipper);
exports.updateShipper = factory.updateOne(Shipper);
exports.deleteShipper = factory.deleteOne(Shipper);
exports.getDetailShipper = factory.getOne(Shipper);

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

  res.cookie('jwt', token, cookieOptions);

  // Remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    user,
  });
};

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // 1) Check if email and password exist
  if (!email || !password) {
    return next(new AppError('Please provide email and password', 400));
  }
  // 2) Check if user exists && password is correct
  const shipper = await Shipper.findOne({ email }).select('+password');
  // console.log("email", email)
  console.log('password', password);
  console.log('shipper', shipper);
  console.log(
    ' shipper.correctPassword(password, shipper.password)',
    await shipper.correctPassword(password, shipper.password)
  );

  if (!shipper || !(await shipper.correctPassword(password, shipper.password))) {
    return next(new AppError('Email hoặc mật khẩu không chính xác!', 401));
  }
  // 3) If everything ok, send token to client
  createSendToken(shipper, 200, res);
});
