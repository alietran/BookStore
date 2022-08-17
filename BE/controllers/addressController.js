const factory = require('../controllers/handlerFactory');
const Address = require('../models/Address');
const catchAsync = require('../utils/catchAsync');

exports.getDetailAddress = factory.getOne(Address);
exports.updateAddress = factory.updateOne(Address);
exports.deleteAddress = factory.deleteOne(Address);
exports.createAddress = factory.createOne(Address);
exports.getAllAddress = factory.getAll(Address);

exports.createAddress = catchAsync(async (req, res, next) => {
  req.body.userId = req.user.id;

  const doc = await Address.create(req.body);

  res.status(201).json({
    status: 'success',
    result: doc.length,
    data: doc,
  });
});

exports.getMeAddress = catchAsync(async (req, res, next) => {
  let query = Address.find(req.query).populate('userId');
  const doc = await query;
  let fillterDoc = doc.filter((item) => item.userId.id === req.user.id);

  if (!fillterDoc) {
    return next(new AppError('No document found with that ID', 404));
  }
  res.status(200).json({
    status: 'success',
    length: 1,
    data: fillterDoc,
  });
});
