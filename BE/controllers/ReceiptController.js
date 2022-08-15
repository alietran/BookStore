const Receipt = require('../models/Receipt');
const Book = require('../models/Book');
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
  const objReceipt = filterObj(
    req.body,
    'totalPriceReceipt',
    'supplierId',
    'adminId'
  );

  const receipt = await Receipt.create(objReceipt);
  req.body.receiptId = receipt.id;

  const objReceiptDetail = filterObj(
    req.body,
    'amount',
    'price',
    'totalPriceReceiptDetail',
    'bookId',
    'receiptId'
  );
  if (receipt.id) {
    await ReceiptDetail.create(objReceiptDetail);
  }
  let query = Book.findById(req.body.bookId);
  let book = await query;
  book.quantity = book.quantity + req.body.amount;
  await book.save();

  res.status(201).json({
    status: 'success',
    result: receipt.length,
    data: receipt,
  });
});
