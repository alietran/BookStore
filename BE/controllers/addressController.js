const factory = require('../controllers/handlerFactory');
const Address = require('../models/Address');
const catchAsync = require('../utils/catchAsync');

exports.getDetailAddress = factory.getOne(Address);
exports.updateAddress = factory.updateOne(Address);
exports.deleteAddress = factory.deleteOne(Address);
exports.getAllAddress = factory.getAll(Address);

exports.createAddress = catchAsync(async (req, res, next) => {
  req.body.userId = req.user.id;

  let query = Address.find(req.query).populate('userId');
  const docAddress = await query;
  let filterDoc = docAddress.filter((item) => item.userId.id === req.user.id);

  for (let i = 0; i <= filterDoc.length - 1; i++) {
    await Address.findByIdAndUpdate(filterDoc[i]._id, {
      isDefault: 'false',
    });
  }

  const doc = await Address.create(req.body);

  res.status(201).json({
    status: 'success',
    result: doc.length,
    data: doc,
    data1: filterDoc,
  });
});

exports.getMeAddress = catchAsync(async (req, res, next) => {
  let query = Address.find(req.query).populate('userId');
  const doc = await query;
  let filterDoc = doc.filter((item) => item.userId.id === req.user.id);
  // for (let i = 0; i < filterDoc.length - 1; i++) {
  //   filterDoc[i].isDefault = false;
  // }

  // filterDoc[filterDoc.length - 1].isDefault = true;

  res.status(200).json({
    status: 'success',
    length: 1,
    data: filterDoc,
  });
});
