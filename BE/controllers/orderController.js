const Order = require('../models/Order');
const OrderDetail = require('../models/OrderDetail');
const Book = require('../models/Book');
const Payment = require('../models/Payment');
const factory = require('../controllers/handlerFactory');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getAllOrder = factory.getAll(Order);

const filterObj = (obj, ...allowedField) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedField.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.createOrder = catchAsync(async (req, res, next) => {
  req.body.user = req.user.id;

  const objOrder = filterObj(
    req.body,
    'address',
    'totalPrice',
    'user',
    'paymentMethod',
    'admin',
    'shipper'
  );

  const order = await Order.create(objOrder);

  let arrayItems = [];
  if (order._id) {
    req.body.items.map(async (item, index) => {
      let book = await Book.findById(item.productId);
      if (book) {
        //  console.log('book', book);
        book.quantity = book.quantity - item.quantity;
        book.quantitySold = book.quantitySold + item.quantity;
        await book.save();
        let product = {
          quantity: item.quantity,
          price: book.price,
          totalPrice: item.quantity * book.price,
          order,
          book: book._id,
        };
        arrayItems.push(product);
      } else {
        return next(new AppError('Không tồn tại quyển sách nào!', 404));
      }

      console.log('arrayItems', arrayItems);
      if (index === req.body.items.length - 1) {
        await OrderDetail.insertMany(arrayItems);
      }

      // if (order._id) {
      //   req.body.map((item, index) => {
      //     req.body[index].order = order._id;
      //   });
      // }
    });
  }

  // await OrderDetail.insertMany(arrayItems);
  // let query = Book.findById(req.body.items[0].productId);
  // const item = await query;

  res.status(201).json({
    status: 'success',
    result: order.length,
    data: order,
  });
});

// exports.getDetailOrder= catchAsync(async (req, res, next) => {

//   res.status(201).json({
//     status: 'success',
//     result: order.length,
//     data: order,
//   });
// });
