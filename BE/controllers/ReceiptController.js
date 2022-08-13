const Receipt = require('../models/Receipt');
const ReceiptDetail = require('../models/ReceiptDetail');
const factory = require('../controllers/handlerFactory');
const catchAsync = require('../utils/catchAsync');

const filterObj = (obj, ...allowedField) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedField.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.getAllReceipt = factory.getAll(Receipt);

exports.createReceipt = catchAsync(async (req, res, next) => {
  req.body.adminId = req.user.id;
  console.log('req.user', req.user);
  const objReceipt = filterObj(
    req.body,
    'totalPriceReceipt',
    'supplierId',
    'adminId'
  );
  const objReceiptDetail = filterObj(
    req.body,
    'amount',
    'price',
    'totalPriceReceiptDetail',
    'receiptId',
    'bookId'
  );
  const receipt = await Receipt.create(objReceipt);
  const ReceiptDetail = await ReceiptDetail.create(objReceiptDetail);

  res.status(201).json({
    status: 'success',
    result: receipt.length,
    data: receipt,
  });
});
