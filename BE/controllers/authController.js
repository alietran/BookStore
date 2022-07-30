const { promisify } = require('util');
const jwt = require('jsonwebtoken');

const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const crypto = require('crypto');

const gravatarUrl = require('gravatar');
const Admin = require('../models/Admin');

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

exports.signup = catchAsync(async (req, res, next) => {
  // create avatar default
  const avatarUrl = gravatarUrl.url(req.body.email, {
    protocol: 'http',
    s: '100',
  });

  const newAdmin = await Admin.create({
    fullName: req.body.fullName,
    phoneNumber: req.body.phoneNumber,
    gender: req.body.gender,
    idRole: req.body.idRole,
    email: req.body.email,
    dateOfBirth: req.body.dateOfBirth,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    passwordChangeAt: req.body.passwordChangeAt,
    avatar: avatarUrl,
    address: req.body.address,
  });

  createSendToken(newAdmin, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // 1) Check if email and password exist
  if (!email || !password) {
    return next(new AppError('Please provide email and password', 400));
  }
  // 2) Check if user exists && password is correct
  const admin = await Admin.findOne({ email }).select('+password');
  // console.log("email", email)
  console.log('password', password);
  console.log('admin', admin);
  console.log(
    ' admin.correctPassword(password, admin.password)',
    await admin.correctPassword(password, admin.password)
  );

  if (!admin || !(await admin.correctPassword(password, admin.password))) {
    return next(new AppError('Email hoặc mật khẩu không chính xác!', 401));
  }
  // 3) If everything ok, send token to client
  createSendToken(admin, 200, res);
});


exports.protect = catchAsync(async (req, res, next) => {
  // 1) Getting token and check of it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  console.log('token', token);
  if (!token) {
    return next(
      new AppError('You are not logged in! Please log in to get access', 401)
    );
  }

  // 2) Verification token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  console.log('decoded', decoded);

  // 3) Check if user still exists
  const currentUser = await Admin.findById(decoded.id);
  console.log('currentUser', currentUser);
  if (!currentUser) {
    return next(
      new AppError('The user belonging to this token does no longer exist', 401)
    );
  }
  // 4) Check if user changed password after the token was issued

  // GRANT ACCESS TO PROTECTED ROUTER
  req.user = currentUser;
  next();
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  // 1) Get user from collection
  const user = await Admin.findById(req.user.id).select('+password');
  // 2) Check if POSTED current password is correct
  if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
    return next(
      new AppError('Mật khẩu hiện tại của bạn không chính xác.', 401)
    );
  }

  // 3) If so, update password
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();
  // User.findByIdAndUpdate will NOT work as intended!

  // 4) Log user in, send  JWT
  createSendToken(user, 200, res);
});