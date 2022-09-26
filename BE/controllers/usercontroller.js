const User = require('../models/User');
const factory = require('../controllers/handlerFactory');
const catchAsync = require('../utils/catchAsync');
const multer = require('multer');
const jwt = require('jsonwebtoken');
const AppError = require('../utils/appError');
const cloudinary = require('../utils/cloudinary');
exports.getAllUser = factory.getAll(User);
exports.updateUser = factory.updateOne(User);
// 
exports.createUser = catchAsync(async (req, res, next) => {
  const { user } = req.body;
  User.findOne(
    {
      phoneUID: user.uid,
    },
    function (err, userOTP) {
      if (err) {
        console.log('err', err);
      }
      console.log('userOTP', userOTP);
      console.log('user', user);
      let customPhoneNumber = '0' + user.phoneNumber.slice(3);
      console.log('customPhoneNumber', customPhoneNumber);
      //Kiểm tra tồn tại của người dùng
      if (!userOTP) {
        newUser = new User({
          active: true,
          avatar: '',
          dateOfBirth: '',
          email: '',
          fullName: '',
          gender: '',
          phoneUID: user.uid,
          phoneNumber: customPhoneNumber,
          role: 'Khách Hàng',
        });
        newUser.save();
      } else {
        console.log('Người dùng đã tồn tại!');
      }
    }
  );
});

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/img/users');
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split('/')[1];
    cb(null, `user-${req.user.id}-${Date.now()}.${ext}`);
  },
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(
      new AppError('Không phải hình ảnh! Vui lòng tải file hình ảnh.', 400),
      false
    );
  }
};

const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

exports.uploadUserPhoto = upload.single('avatar');

const filterObj = (obj, ...allowedField) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedField.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

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

// exports.updateUser = factory.updateOne(User);

exports.updateMe = catchAsync(async (req, res, next) => {
  // 2) Update user document
  // Get filtered name and email
  const filteredBody = filterObj(
    req.body,
    'fullName',
    'phoneNumber',
    'gender',
    'dateOfBirth',
    'avatar',
  );
  console.log('filteredBody', filteredBody);
  console.log('req.body', req.body);
  console.log('req.user.id', req.user.id);
  const uploadedResponse = await cloudinary.uploader.upload(
    filteredBody.avatar,
    {
      upload_preset: 'profile',
    }
  );
     filteredBody.avatar = uploadedResponse.secure_url;
  // const path = req.file?.path.replace(/\\/g, '/').substring('public'.length);
  // const urlImage = `http://localhost:8080${path}`;
  // if (req.file) filteredBody.avatar = urlImage;
  const user = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    status: 'success',
    result: user.length,
    data: user,
  });
});

// exports.updateMe = catchAsync(async (req, res, next) => {
//   // 2) Update user document
//   // Get filtered name and email
//   const filteredBody = filterObj(
//     req.body,
//     'fullName',
//     'phoneNumber',
//     'gender',
//     'dateOfBirth',
//     'avatar',
//   );
//   console.log('filteredBody', filteredBody);
//   console.log('req.body', req.body);
//   console.log('req.user.id', req.user.id);
//   const uploadedResponse = await cloudinary.uploader.upload(
//     filteredBody.avatar,
//     {
//       upload_preset: 'profile',
//     }
//   );
//      filteredBody.avatar = uploadedResponse.secure_url;
//   // const path = req.file?.path.replace(/\\/g, '/').substring('public'.length);
//   // const urlImage = `http://localhost:8080${path}`;
//   // if (req.file) filteredBody.avatar = urlImage;
//   const user = await User.findByIdAndUpdate(req.user.id, filteredBody, {
//     new: true,
//     runValidators: true,
//   });
//   res.status(200).json({
//     status: 'success',
//     result: user.length,
//     data: user,
//   });
// });



exports.getUserLoginOtp = catchAsync(async (req, res, next) => {
  const { phoneNumber } = req.body;
  let customPhoneNumber = 0 + phoneNumber.slice(3);
  let userNumber = await User.findOne({ phoneNumber: customPhoneNumber });
  if (!userNumber) {
    return next(
      new AppError('Số điện thoại không chính xác hoặc không tồn tại!', 401)
    );
  }

  createSendToken(userNumber, 200, res);
});
