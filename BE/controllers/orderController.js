const Order = require('../models/Order');
const OrderDetail = require('../models/OrderDetail');
const Book = require('../models/Book');
const Payment = require('../models/Payment');
const factory = require('../controllers/handlerFactory');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const nodemailer = require('nodemailer');
require('dotenv').config();

let transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_APP, // generated ethereal user
    pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
  },
});

exports.getAllOrder = factory.getAll(Order);

const filterObj = (obj, ...allowedField) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedField.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.createOrder = catchAsync(async (req, res, next) => {
  const { id, fullName, phoneNumber } = req.user;

  try {
    req.body.user = id;

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
    req.order = order;

    let arrayItems = [];

    if (order._id) {
      await req.body.items.map(async (item, index) => {
        let book = await Book.findById(item.productId);
        if (book) {
          book.quantity = book.quantity - item.quantity;
          book.quantitySold = book.quantitySold + item.quantity;
          await book.save();
          let product = {
            quantity: item.quantity,
            price: book.price,
            totalPrice: item.quantity * book.price,
            order,
            book: book._id,
            name: book.name,
          };
          arrayItems.push(product);
        } else {
          return next(new AppError('Không tồn tại quyển sách nào!', 404));
        }

        if (index === req.body.items.length - 1) {
          let orderDetail = await OrderDetail.insertMany(arrayItems);
          req.arrayItems = arrayItems;

          const { address, totalPrice } = req.order;
          await transporter.sendMail({
            from: `"Giao Dich Thanh Cong " <ltd.ctu@gmail.com>`, // sender address
            to: 'ngocdiep710@gmail.com', // list of receivers
            subject: 'EMAIL XÁC NHẬN ĐẶT HÀNG THÀNH CÔNG', // Subject line
            // text: "Hello world?", // plain text body
            html: `<p>Họ và tên: ${fullName}</p>
            <p>Số điện thoại: ${phoneNumber}</p>
              <p>Địa chỉ: ${address.address}, ${address.ward}, ${
              address.district
            }, ${address.city}</p>
              <p>Tổng tiền: ${(totalPrice * 1).toLocaleString('vi-VI')} VNĐ</p>
              <p>Chi tiết sản phẩm: 
              <span>
              ${arrayItems.map(
                (item,index) =>
                  `<div key=${index}>${item.name}  <b>x</b> ${item.quantity} = ${(
                    item.price * 1
                  ).toLocaleString('vi-VI')}đ </div>`
              )} 
              </span>
              </p>
             `,
          });
        }
      });

      res.status(201).json({
        status: 'success',
        result: order.length,
        data: order,
      });
    }
  } catch (err) {
    res.status(400).json({ message: err });
  }


});


