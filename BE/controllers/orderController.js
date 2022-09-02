const Order = require('../models/Order');
const OrderDetail = require('../models/OrderDetail');
const Book = require('../models/Book');
const Payment = require('../models/Payment');
const factory = require('./handlerFactory');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const formatDate = require('../utils/formatDate');
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
exports.updateOrder = factory.updateOne(Order);
exports.getDetailOrder = factory.getOne(Order, { path: 'orderDetail' });

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
      'shipper',
      'promotion'
    );

    const order = await Order.create(objOrder);
    req.order = order;

    let arrayItems = [];

    if (order._id) {
      await req.body.items.map(async (item, index) => {
        let book = await Book.findById(item.productId);
        if (book) {
          if (order.paymentMethod.resultCode == 1006) {
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
          }
        } else {
          return next(new AppError('Không tồn tại quyển sách nào!', 404));
        }

        if (arrayItems.length === req.body.items.length) {
          await OrderDetail.insertMany(arrayItems);
          const { address, totalPrice, _id, paymentMethod, createdAt } =
            req.order;
          let dayFull = formatDate(createdAt).dateFull;
          await transporter.sendMail({
            from: `"Thông báo xác nhận đơn hàng #${_id}" <ltd.ctu@gmail.com>`, // sender address
            to: 'ngocdiep710@gmail.com', // list of receivers
            subject: 'EMAIL XÁC NHẬN ĐẶT HÀNG THÀNH CÔNG', // Subject line
            // text: "Hello world?", // plain text body
            html: `
            <div marginwidth="0" marginheight="0" style="padding:0">
		<div id="m_-2654664080331285438wrapper" dir="ltr" style="background-color:#f7f7f7;margin:0;padding:70px 0;width:100%" bgcolor="#f7f7f7" width="100%">
			<table border="0" cellpadding="0" cellspacing="0" height="100%" width="100%">
<tbody><tr>
<td align="center" valign="top">
						<div id="m_-2654664080331285438template_header_image">
													</div>
						<table border="0" cellpadding="0" cellspacing="0" width="720" id="m_-2654664080331285438template_container" style="background-color:#fff;border:1px solid #dedede;border-radius:3px" bgcolor="#fff">
<tbody><tr>
<td align="center" valign="top">
									
									<table border="0" cellpadding="0" cellspacing="0" width="100%" id="m_-2654664080331285438template_header" style="background-color:#96588a;color:#fff;border-bottom:0;font-weight:bold;line-height:100%;vertical-align:middle;font-family:&quot;Helvetica Neue&quot;,Helvetica,Roboto,Arial,sans-serif;border-radius:3px 3px 0 0" bgcolor="#96588a"><tbody><tr>
<td id="m_-2654664080331285438header_wrapper" style="padding:36px 48px;display:block">
												<h1 style="font-family:&quot;Helvetica Neue&quot;,Helvetica,Roboto,Arial,sans-serif;font-size:30px;font-weight:300;line-height:150%;margin:0;text-align:left;color:#fff;background-color:inherit" bgcolor="inherit">Cảm ơn đã mua <span class="il">hàng</span> của chúng tôi</h1>
											</td>
										</tr></tbody></table>

</td>
							</tr>
<tr>
<td align="center" valign="top">
									
									<table border="0" cellpadding="0" cellspacing="0" width="720" id="m_-2654664080331285438template_body"><tbody><tr>
<td valign="top" id="m_-2654664080331285438body_content" style="background-color:#fff" bgcolor="#fff">
												
												<table border="0" cellpadding="20" cellspacing="0" width="100%"><tbody><tr>
<td valign="top" style="padding:48px 48px 32px">
															<div id="m_-2654664080331285438body_content_inner" style="color:#636363;font-family:&quot;Helvetica Neue&quot;,Helvetica,Roboto,Arial,sans-serif;font-size:14px;line-height:150%;text-align:left" align="left">

<p style="margin:0 0 16px">Xin chào ${address.fullName},</p>
<p style="margin:0 0 16px">Chúng tôi đã nhận được đặt hàng của bạn và đã sẵn sàng để vận chuyển. Chúng tôi sẽ thông báo cho bạn khi đơn hàng được gửi đi.</p>
<p style="margin:0 0 16px">${paymentMethod.name}</span>.</p>


<h2 style="color:#96588a;display:block;font-family:&quot;Helvetica Neue&quot;,Helvetica,Roboto,Arial,sans-serif;font-size:18px;font-weight:bold;line-height:130%;margin:0 0 18px;text-align:left">
	[<span class="il">Đơn</span> <span class="il">hàng</span> #${_id}] (${dayFull})</h2>

<div style="margin-bottom:40px">
	<table cellspacing="0" cellpadding="6" border="1" style="color:#636363;border:1px solid #e5e5e5;vertical-align:middle;width:100%;font-family:'Helvetica Neue',Helvetica,Roboto,Arial,sans-serif" width="100%">
<thead><tr>
<th scope="col" style="color:#636363;border:1px solid #e5e5e5;vertical-align:middle;padding:12px;text-align:left" align="left">Sản phẩm</th>
				<th scope="col" style="color:#636363;border:1px solid #e5e5e5;vertical-align:middle;padding:12px;text-align:left" align="left">Số lượng</th>
				<th scope="col" style="color:#636363;border:1px solid #e5e5e5;vertical-align:middle;padding:12px;text-align:left" align="left">Giá</th>
			</tr></thead>
<tbody>

 ${arrayItems
   .map((item, index) =>
     `
   <tr key=${index}>
              <td style="color:#636363;border:1px solid #e5e5e5;padding:12px;text-align:left;vertical-align:middle;font-family:'Helvetica Neue',Helvetica,Roboto,Arial,sans-serif;word-wrap:break-word" align="left">
              ${item.name}
              </td>
		<td style="color:#636363;border:1px solid #e5e5e5;padding:12px;text-align:left;vertical-align:middle;font-family:'Helvetica Neue',Helvetica,Roboto,Arial,sans-serif" align="left">
		${item.quantity}	</td>
		<td style="color:#636363;border:1px solid #e5e5e5;padding:12px;text-align:left;vertical-align:middle;font-family:'Helvetica Neue',Helvetica,Roboto,Arial,sans-serif" align="left">
			<span>${(item.quantity * item.price).toLocaleString(
        'vi-VI'
      )}&nbsp;<span>đ</span></span>		</td></tr>
              `.trim()
   )
   .join('')}
  </tbody>
<tfoot>
<tr>
<th scope="row" colspan="2" style="color:#636363;border:1px solid #e5e5e5;vertical-align:middle;padding:12px;text-align:left;border-top-width:4px" align="left">Tổng số phụ:</th>
						<td style="color:#636363;border:1px solid #e5e5e5;vertical-align:middle;padding:12px;text-align:left;border-top-width:4px" align="left"><span>${totalPrice.toLocaleString(
              'vi-VI'
            )} &nbsp;<span>₫</span></span></td>
					</tr>
<tr>
<th scope="row" colspan="2" style="color:#636363;border:1px solid #e5e5e5;vertical-align:middle;padding:12px;text-align:left;border-top-width:4px" align="left">Khuyến mãi:</th>
						<td style="color:#636363;border:1px solid #e5e5e5;vertical-align:middle;padding:12px;text-align:left;border-top-width:4px" align="left"><span>0 &nbsp;<span>₫</span></span></td>
					</tr>

<tr>
<th scope="row" colspan="2" style="color:#636363;border:1px solid #e5e5e5;vertical-align:middle;padding:12px;text-align:left" align="left">Giao nhận <span class="il">hàng</span>:</th>
						<td style="color:#636363;border:1px solid #e5e5e5;vertical-align:middle;padding:12px;text-align:left" align="left">Giao <span class="il">hàng</span> miễn phí</td>
					</tr>
<tr>
<th scope="row" colspan="2" style="color:#636363;border:1px solid #e5e5e5;vertical-align:middle;padding:12px;text-align:left" align="left">Phương thức thanh toán:</th>
						<td style="color:#636363;border:1px solid #e5e5e5;vertical-align:middle;padding:12px;text-align:left" align="left">${
              paymentMethod.name
            }</span></td>
					</tr>
<tr>
<th scope="row" colspan="2" style="color:#636363;border:1px solid #e5e5e5;vertical-align:middle;padding:12px;text-align:left" align="left">Tổng cộng:</th>
						<td style="color:#636363;border:1px solid #e5e5e5;vertical-align:middle;padding:12px;text-align:left" align="left"><span>${totalPrice.toLocaleString(
              'vi-VI'
            )}&nbsp;<span>₫</span></span></td>
					</tr>
</tfoot>
</table>
</div>

<table id="m_-2654664080331285438addresses" cellspacing="0" cellpadding="0" border="0" style="width:100%;vertical-align:top;margin-bottom:40px;padding:0" width="100%"><tbody><tr>
<td valign="top" width="50%" style="text-align:left;font-family:'Helvetica Neue',Helvetica,Roboto,Arial,sans-serif;border:0;padding:0" align="left">
			<h2 style="color:#96588a;display:block;font-family:&quot;Helvetica Neue&quot;,Helvetica,Roboto,Arial,sans-serif;font-size:18px;font-weight:bold;line-height:130%;margin:0 0 18px;text-align:left">Địa chỉ thanh toán</h2>

			<address style="padding:12px;color:#636363;border:1px solid #e5e5e5">
				${address.fullName}
        <br><a href="tel:${
          address.phoneNumber
        }" style="color:#96588a;font-weight:normal;text-decoration:underline" target="_blank">${
              address.phoneNumber
            }</a>
        <br>Số nhà : ${address.address}, ${address.ward}, ${
              address.district
            }, ${address.city}</address>
		</td>
					<td valign="top" width="50%" style="text-align:left;font-family:'Helvetica Neue',Helvetica,Roboto,Arial,sans-serif;padding:0" align="left">
				<h2 style="color:#96588a;display:block;font-family:&quot;Helvetica Neue&quot;,Helvetica,Roboto,Arial,sans-serif;font-size:18px;font-weight:bold;line-height:130%;margin:0 0 18px;text-align:left">Địa chỉ giao <span class="il">hàng</span></h2>

						<address style="padding:12px;color:#636363;border:1px solid #e5e5e5">
				${address.fullName}
        <br><a href="tel:${
          address.phoneNumber
        }" style="color:#96588a;font-weight:normal;text-decoration:underline" target="_blank">${
              address.phoneNumber
            }</a>
        <br>Số nhà : ${address.address}, ${address.ward}, ${
              address.district
            }, ${address.city}</address>
			</td>
			</tr></tbody></table>
<p style="margin:0 0 16px">Cảm ơn đã mua <span class="il">hàng</span> của chúng tôi.</p>
															</div>
														</td>
													</tr></tbody></table>

</td>
										</tr></tbody></table>

</td>
							</tr>
</tbody></table>
</td>
				</tr>
<tr>
<td align="center" valign="top">
						
						<table border="0" cellpadding="10" cellspacing="0" width="600" id="m_-2654664080331285438template_footer"><tbody><tr>
<td valign="top" style="padding:0;border-radius:6px">
									<table border="0" cellpadding="10" cellspacing="0" width="100%"><tbody><tr>
<td colspan="2" valign="middle" id="m_-2654664080331285438credit" style="border-radius:6px;border:0;color:#8a8a8a;font-family:&quot;Helvetica Neue&quot;,Helvetica,Roboto,Arial,sans-serif;font-size:12px;line-height:150%;text-align:center;padding:24px 0" align="center">
											<p style="margin:0;color:#999;line-height:150%;font-size:14px">Nếu bạn có bất cứ câu hỏi nào, đừng ngần ngại liên lạc với chúng tôi tại <a href="mailto:ngocdiep710@gmail.com" style="font-size:14px;text-decoration:none;color:#1666a2" target="_blank">ngocdiep710@gmail.com</a></p>
											</td>
										</tr></tbody></table>
</td>
							</tr></tbody></table>

</td>
				</tr>
</tbody></table><div class="yj6qo"></div><div class="adL">
</div></div><div class="adL">
	</div></div>
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
