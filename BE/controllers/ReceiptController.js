const Receipt = require('../models/Receipt');
const Book = require('../models/Book');
const ReceiptDetail = require('../models/ReceiptDetail');
const factory = require('../controllers/handlerFactory');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const filterObj = (obj, ...allowedField) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedField.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.getAllReceipt = factory.getAll(Receipt, { path: 'receiptdetail' });
exports.getDetailReceipt = factory.getOne(Receipt);

exports.createReceipt = catchAsync(async (req, res, next) => {
  let totalPriceReceipt = 0;
  let supplierId;
  req.body.map((item, index) => {
    totalPriceReceipt += item.totalPriceReceiptDetail;
    supplierId = item.supplierId;
  });
  req.body.adminId = req.user.id;
  req.body.totalPriceReceipt = totalPriceReceipt;
  req.body.supplierId = supplierId;

  const objReceipt = filterObj(
    req.body,
    'totalPriceReceipt',
    'supplierId',
    'adminId'
  );

  const receipt = await Receipt.create(objReceipt);

  if (receipt._id) {
    req.body.map((item, index) => {
      req.body[index].receiptId = receipt._id;
    });
    const receiptDetail = await ReceiptDetail.insertMany(req.body);
  }

  res.status(201).json({
    status: 'success',
    result: receipt.length,
    data: receipt,
  });
});

exports.updateReceipt = catchAsync(async (req, res, next) => {
  const _id = req.params.id;
  console.log('_id', _id);
  console.log('req.body', req.body);

  let doc = await Receipt.findByIdAndUpdate(_id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!doc) {
    return next(new AppError('No document found with that ID', 404));
  }

  let query = Book.findById(req.body.bookId);
  let book = await query;
  console.log('book', book);

  book.quantity = book.quantity + req.body.quantity;
  await book.save();

  res.status(200).json({
    status: 'success',
    result: doc.length,
    data: doc,
  });
});
