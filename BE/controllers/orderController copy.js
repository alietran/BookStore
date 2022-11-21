const Order = require('../models/Order');
const OrderDetail = require('../models/OrderDetail');
const Book = require('../models/Book');
const Promotion = require('../models/Promotion');
const factory = require('./handlerFactory');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const formatDate = require('../utils/formatDate');
const nodemailer = require('nodemailer');
const moment = require('moment');
const _ = require('lodash');

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

exports.getAllOrder = factory.getAll(Order, { path: 'orderDetail' });
// exports.updateOrder = factory.updateOne(Order);
exports.getDetailOrder = factory.getOne(Order, { path: 'orderDetail' });

exports.updateOrder = catchAsync(async (req, res, next) => {
  const _id = req.params.id;
  let orderDetailList = [];
  if (req.body.status === 'Đã hủy') {
    let doc = await Order.findByIdAndUpdate(_id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    } else {
      let orderDetail = await OrderDetail.find();
      console.log('req.params.id', req.params.id);
      orderDetailList = orderDetail.filter(
        (item) => item.order.id === req.params.id
      );

      await orderDetailList.map(async (item, index) => {
        let book = await Book.findById(item.book._id);
        if (book) {
          book.quantity = book.quantity + item.quantity;
          book.quantitySold = book.quantitySold - item.quantity;
          await book.save();
        } else {
          return next(new AppError('Không tồn tại quyển sách nào!', 404));
        }
      });
      console.log('doc123', doc);
      const {
        user: { fullName, phoneUID, phoneNumber },
        totalPrice,
      } = doc;
      await transporter.sendMail({
        from: `"Đơn hàng #${_id} đã huỷ hàng thành công" <alietran0211@gmail.com>`, // sender address
        to: 'thanhledatomon@gmail.com', // list of receivers
        subject: 'EMAIL XÁC NHẬN HUỶ ĐẶT HÀNG', // Subject line
        // text: "Hello world?", // plain text body
        html: `
       <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="margin:0 auto;width:600px!important;min-width:600px!important"><tbody><tr><td align="center" valign="middle" style="background:#ffffff"><table style="width:580px;border-bottom:1px solid #ff3333" cellpadding="0" cellspacing="0" border="0"><tbody><tr><td align="left" valign="middle" style="width:500px;height:60px"><a style="border:0" href="https://www.sendo.vn/" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://www.sendo.vn/&amp;source=gmail&amp;ust=1667581755494000&amp;usg=AOvVaw3tvZya6OYQv46dAenVrr2U"><img style="display:block;border:0px;width:130px;height:35px" src="https://res.cloudinary.com/bookstoremern/image/upload/v1665027528/zypbndetwpvlawbbegz3.png" class="CToWUd" data-bit="iit"> </a></td></tr></tbody></table></td></tr><tr><td align="center" valign="middle" style="background:#ffffff"><table style="width:580px" cellpadding="0" cellspacing="0" border="0"><tbody><tr><td valign="middle" style="font-family:Arial,Helvetica,sans-serif;font-size:24px;color:rgb(255,51,51);text-transform:uppercase;font-weight:bold;padding:25px 10px 15px;text-align:center">Thông báo hủy đơn hàng</td></tr><tr><td align="left" valign="middle" style="font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#666666;padding:0 10px 20px 10px;line-height:17px"><p>Chào bạn <strong>${
         phoneUID ? phoneNumber : ''
       }</strong><strong>${fullName}</strong>,&nbsp;</p><p>Rất tiếc, đơn hàng <b>#</b> <a style="color:#ed2324;font-weight:bold;text-decoration:none" href="http://localhost:3000/orderDetail/${_id}" target="_blank" data-saferedirecturl="http://localhost:3000/orderDetail/${_id}">${_id}</a>&nbsp;của bạn đã&nbsp;<strong>bị hủy</strong>&nbsp;vì:&nbsp;<strong>Thay đổi chi tiết đơn hàng</strong>.&nbsp;</p><span class="im"><p>Nếu bạn đã thanh toán, vui lòng chờ nhà cung cấp xử lý.</p><p><a href="http://localhost:3000" target="_blank" data-saferedirecturl="http://localhost:3000">Bookstore</a> rất xin lỗi vì trải nghiệm không mong muốn này. Mong được phục vụ bạn trong lần mua sắm tiếp theo.&nbsp;</p></span></td></tr></tbody></table></td></tr><tr><td align="center" valign="middle" style="background:#ffffff"><table style="width:580px;border:1px solid #ff3333;border-top:3px solid #ff3333" cellpadding="0" cellspacing="0" border="0"><tbody><tr><td colspan="3" align="left" valign="top" style="font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#666666;padding:10px 10px 20px 15px;line-height:17px"><b>Đơn hàng của bạn #</b> <a style="color:#ed2324;font-weight:bold;text-decoration:none" href="http://localhost:3000/orderDetail/${_id}" target="_blank" data-saferedirecturl="http://localhost:3000/orderDetail/${_id}">${_id}</a></td></tr><tr><td align="left" valign="top" style="width:110px;font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#666666;line-height:20px;padding-left:15px;padding-right:10px;padding-bottom:5px"><b>Tổng thanh toán</b></td><td align="left" valign="top" style="font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#666666;line-height:20px;padding-bottom:5px">:</td><td align="left" valign="top" style="font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#666666;line-height:20px;padding-left:10px;padding-bottom:5px">${totalPrice.toLocaleString(
          'vi-VI'
        )}đ</td></tr><tr><td align="left" valign="top" style="width:110px;font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#666666;line-height:20px;padding-left:15px;padding-right:10px;padding-bottom:5px"><b>Tình trạng</b></td><td align="left" valign="top" style="font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#666666;line-height:20px;padding-bottom:5px">:</td><td align="left" valign="top" style="font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#666666;line-height:20px;padding-left:10px;padding-bottom:5px">Đã hủy</td></tr><tr><td colspan="3" align="center" valign="top" style="padding-top:20px;padding-bottom:20px;border-bottom:1px solid #ebebeb"><a style="border:0px" href="http://localhost:3000/orderDetail/${_id}" target="_blank" data-saferedirecturl="http://localhost:3000/orderDetail/${_id}"><img height="29" width="191" alt="Chi tiết đơn hàng" style="border:0px" src="https://ci6.googleusercontent.com/proxy/nFW6md3bBSTjJfQBWlQveee6eY3SGMsVjLDBR3oILDY_cYT1QP6SgXgt6Y0iAsOCjAqyv7-8kmmkyLAiQ7mplPTU=s0-d-e1-ft#http://media3.scdn.vn/img2/2017/4_19/ZxRyKS.jpg" class="CToWUd" data-bit="iit"> </a></td></tr><tr><td colspan="3" align="left" valign="top" style="font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#666666;line-height:17px;padding:20px 0 20px 15px">Thông tin sản phẩm</td></tr><tr><td colspan="3" align="center" valign="top"><table id="m_-3634225509215781968ListProductHtml" style="width:100%" cellpadding="0" cellspacing="0" border="0"><tbody>
        ${orderDetailList.map(
          (item, index) => `
        <tr key=${index}>
        <td align="left" valign="top" style="width:84px;padding-left:15px;padding-bottom:20px"><a href="http://localhost:3000/productDetail/${item.book._id}" style="border:0" target="_blank" data-saferedirecturl="http://localhost:3000/productDetail/${item.book._id}"><img src="${item.book.image}" height="74" width="74" alt="Product" class="CToWUd" data-bit="iit"></a></td>
        <td align="left" valign="top" style="font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#666666;line-height:20px;padding:0 30px 20px 10px"><b>Tên sản phẩm: </b><a href="http://localhost:3000/productDetail/${item.book._id}" style="text-decoration:none;font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#666666" target="_blank" data-saferedirecturl="http://localhost:3000/productDetail/${item.book._id}">${item.book.name}</a><br><b>Đơn giá:</b> ${(item.price*1).toLocaleString(
          'vi-VI'
        )}đ<br><b>Số lượng:</b> ${item.quantity}</td>
        </tr>`
        )}
        </tbody></table></td></tr></tbody></table></td></tr><tr><td align="center" valign="middle" style="background:#ffffff;padding-top:20px"><table style="width:500px" cellpadding="0" cellspacing="0" border="0"><tbody><tr><td align="center" valign="middle" style="font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#666666;line-height:20px;padding-bottom:5px">Nếu bạn có bất cứ câu hỏi nào, đừng ngần ngại liên lạc với chúng tôi tại&nbsp;<a href="mailto:ngocdiep710@gmail.com" style="font-size:14px;text-decoration:none;color:#1666a2" target="_blank">ngocdiep710@gmail.com</a>&nbsp;của Bookstore.</td></tr></tbody></table></td></tr></tbody></table>
             `,
      });

      res.status(200).json({
        status: 'success',
        result: doc.length,
        data: doc,
      });
      console.log('orderDetailList', orderDetailList);
    }
  } else if (req.body.status === 'Đã giao hàng') {
    const doc = await Order.findByIdAndUpdate(_id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    console.log('Doc', doc);
    await transporter.sendMail({
      from: `"Đơn hàng #${_id} đã giao hàng thành công" <alietran0211@gmail.com>`, // sender address
      to: 'ngocdiep710@gmail.com', // list of receivers
      subject: 'EMAIL XÁC NHẬN ĐẶT HÀNG THÀNH CÔNG', // Subject line
      // text: "Hello world?", // plain text body
      html: `
          <div>
              <table width="100%" bgcolor="#ffffff" cellpadding="0" cellspacing="0" border="0" id="m_7455533599601926697backgroundTable">
      <tbody>
      <tr>
          <td>
              <table width="600" cellpadding="0" cellspacing="0" border="0" align="center">
                  <tbody>
                  <tr>
                      <td width="100%">
                          <table bgcolor="#ffffff" width="600" cellpadding="0" cellspacing="0" border="0" align="center">
                              <tbody>
                              <tr>
                                  <td>
                                      <table width="560" align="center" cellpadding="0" cellspacing="0" border="0">
                                          <tbody>
                                          
                                          <tr>
                                                    <td align="center"><img src="https://res.cloudinary.com/bookstoremern/image/upload/v1665027528/zypbndetwpvlawbbegz3.png" width="140" height="auto" style="width:25%;height:auto" class="CToWUd" data-bit="iit"></td>
                                          </tr>
                                          
                                          
                                          
                                          <tr>
                                              <td height="10" style="font-size:1px;line-height:1px">&nbsp;</td>
                                          </tr>
                                          
                                          </tbody>
                                      </table>
                                  </td>
                              </tr>
                              </tbody>
                          </table>
                      </td>
                  </tr>
                  </tbody>
              </table>
          </td>
      </tr>
      </tbody>
  </table>
  <table width="100%" bgcolor="#ffffff" cellpadding="0" cellspacing="0" border="0" id="m_7455533599601926697backgroundTable">
    <tbody>
    <tr>
        <td>
            <table width="600" cellpadding="0" cellspacing="0" border="0" align="center">
                <tbody>
                <tr>
                    <td width="100%">
                        <table bgcolor="#ffffff" width="600" cellpadding="0" cellspacing="0" border="0" align="center">
                            <tbody>
                            
                            <tr>
                                <td height="10" style="font-size:1px;line-height:1px">&nbsp;</td>
                            </tr>
                            
                            <tr>
                                <td>
                                    <table width="560" align="center" cellpadding="0" cellspacing="0" border="0">
                                        <tbody>
                                        

<tr>
    <td style="font-family:Helvetica,arial,sans-serif;font-size:13px;color:#000000;text-align:left;line-height:18px">
        Xin chào ${doc.user.fullName},
    </td>
</tr>


    <tr>
        <td width="100%" height="10" style="font-size:1px;line-height:1px">&nbsp;</td>
    </tr>


<tr>
    <td style="font-family:Helvetica,arial,sans-serif;font-size:13px;color:#000000;text-align:left;line-height:18px">

        Đơn hàng <a href="http://localhost:3000/orderDetail/${_id}" style="text-decoration:none;color:#ff5722" target="_blank" data-saferedirecturl="http://localhost:3000/orderDetail/${_id}">#${_id}</a> của bạn đã được giao thành
        công ngày. <br><br>
        Vui lòng đăng nhập BookStore để xác nhận bạn đã nhận hàng và hài lòng với sản phẩm trong
        vòng 3 ngày.
        <br>
    </td>
</tr>


    <tr>
        <td width="100%" height="10" style="font-size:1px;line-height:1px">&nbsp;</td>
    </tr>


<tr>
    <td colspan="2">
        <table border="0" cellspacing="0" cellpadding="0" align="center">
            <tbody><tr>
                <td bgcolor="#EE4D2D" style="padding:8px 30px 8px 30px;border-radius:3px" align="center"><a style="color:#fff; text-decoration:none" href="http://localhost:3000/orderDetail/${_id}">
                        Đã nhận hàng </a></td>
            </tr>
        </tbody></table>
    </td>
</tr>

    <tr>
        <td width="100%" height="10" style="font-size:1px;line-height:1px">&nbsp;</td>
    </tr>


                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td width="100%" height="1" bgcolor="#ffffff" style="font-size:1px;line-height:1px">&nbsp;</td>
                            </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
                </tbody>
            </table>
        </td>
    </tr>
    </tbody>
</table>
          </div>
             `,
    });

    res.status(200).json({
      status: 'success',
      result: doc.length,
      data: doc,
    });
  } else {
    const doc = await Order.findByIdAndUpdate(_id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }
    res.status(200).json({
      status: 'success',
      result: doc.length,
      data: doc,
    });
  }
});

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
      'promotion',
      'status'
    );
    const order = await Order.create(objOrder);
    req.order = order;
    console.log('order', order);
    let arrayItems = [];
    if (req.order.promotion !== null) {
      const promotion = await Promotion.find(req.order.promotion);
      req.promotion = promotion;
    }
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
          const { address, totalPrice, _id, paymentMethod, createdAt, status } =
            req.order;
          if (status !== 'Đã hủy') {
            let dayFull = formatDate(createdAt).dateFull;
            console.log('req.promotion', req.promotion);
            req.promotion =
              req.promotion !== undefined ? Number(req.promotion[0].price) : 0;

            await transporter.sendMail({
              from: `"Thông báo xác nhận đơn hàng #${_id}" <alietran0211@gmail.com>`, // sender address
              to: `${address.email}`, // list of receivers
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
      )}&nbsp;<span>₫</span></span>		</td></tr>
              `.trim()
   )
   .join('')}
  </tbody>
<tfoot>
<tr>
<th scope="row" colspan="2" style="color:#636363;border:1px solid #e5e5e5;vertical-align:middle;padding:12px;text-align:left;border-top-width:4px" align="left">Tổng số phụ:</th>
						<td style="color:#636363;border:1px solid #e5e5e5;vertical-align:middle;padding:12px;text-align:left;border-top-width:4px" align="left"><span>${(
              Number(totalPrice) + req.promotion
            ).toLocaleString('vi-VI')} &nbsp;<span>₫</span></span></td>
					</tr>
<tr>
<th scope="row" colspan="2" style="color:#636363;border:1px solid #e5e5e5;vertical-align:middle;padding:12px;text-align:left;border-top-width:4px" align="left">Khuyến mãi:</th>
						<td style="color:#636363;border:1px solid #e5e5e5;vertical-align:middle;padding:12px;text-align:left;border-top-width:4px" align="left"><span>${req.promotion.toLocaleString(
              'vi-VI'
            )} &nbsp;<span>₫</span></span></td>
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
			<h2 style="color:#96588a;display:block;font-family:&quot;Helvetica Neue&quot;,Helvetica,Roboto,Arial,sans-serif;font-size:18px;font-weight:bold;line-height:130%;margin:0 0 18px;text-align:left">Địa chỉ giao hàng</h2>

			<address style="padding:12px;color:#636363;border:1px solid #e5e5e5; font-size: 15px">
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
exports.getAllTicketByUser = catchAsync(async (req, res, next) => {
  // console.log('req.user', typeof req.user.id);
  let order = await Order.find()
    .populate(['user', 'orderDetail'])
    .sort({ createdAt: -1 });
  // console.log('order', order);
  let data = order.filter((item) => item.user.id === req.user.id);

  res.status(200).json({
    status: 'success',
    result: data.length,
    data,
  });
});

exports.orderRevenueStatisticsForWeek = catchAsync(async (req, res, next) => {
  let dayLabel = [];
  for (var i = 0; i < 7; i++) {
    dayLabel[i] = moment().subtract(i, 'days').format('DD-MM-YYYY');
  }
  // console.log('moment().day(-6).toDate()', moment().day(-6).toDate());
  // console.log('123', moment().startOf('week').isoWeekday(8).toDate());

  let array = await Order.find({
    createdAt: {
      $gte: moment().day(-6).toDate(),
      $lt: moment().startOf('week').isoWeekday(8).toDate(),
    },
  }).sort({ createdAt: 1 });
  // console.log('array', array);
  let result = _(array)
    .groupBy((x) => moment(x.createdAt).format('DD-MM-YYYY'))
    .map((value, key) => ({ name: key, orderRevenue: value }))
    .value();

  function convert(str) {
    var date = new Date(str),
      mnth = ('0' + (date.getMonth() + 1)).slice(-2),
      day = ('0' + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join('-');
  }

  var getDaysArray = function (year, month) {
    var monthIndex = month - 1; // 0..11 instead of 1..12
    var names = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
    var date = new Date(year, monthIndex, 1);
    var result = [];
    while (date.getMonth() == monthIndex) {
      result.push(moment(convert(new Date(date))).format('DD-MM-YYYY') + '');
      date.setDate(date.getDate() + 1);
    }
    return result;
  };
  try {
    res.status(200).json({
      status: 'success',
      result: result.length,
      data: result,
    });
  } catch (err) {
    res.status(400).json({ message: err });
  }
});
exports.orderRevenueStatisticsForMonth = catchAsync(async (req, res, next) => {
  let today = new Date();
  let firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
  let lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  // moment(firstDay).format('MM-YYYY');
  // console.log('firstDay', moment(firstDay).format('MM-YYYY'));
  // var date = new Date();
  // var month = date.Month();
  const a = 'Đã nhận';
  const b = 'Đã đánh giá';
  let array = await Order.find({
    $or: [{ status: 'Đã nhận' }, { status: 'Đã đánh giá' }],
    // status: 'Đã đánh giá',
  }).sort({ createdAt: 1 });
  // console.log('array', array);
  // let key = new Date()
  let result = _(array)
    .groupBy((x) => moment(x.createdAt).format('DD-MM-YYYY'))
    .map((value, key) => ({
      // name: moment(new Date(key)).format('MM'),
      name: key,
      orderRevenueDay: value,
    }))
    .value();
  let result1 = _(result)
    .groupBy((x) => moment(x.orderRevenueDay[0].createdAt).format('MM-YYYY'))
    .map((value, key) => ({
      // name: moment(new Date(key)).format('MM'),
      name: key,
      orderRevenue: value,
    }))
    .value();
  let orderMonth = moment().toDate();
  console.log(' orderMonth.getMonth()', moment(orderMonth).format('MM-YYYY'));
  let orderMonthFormat = moment(orderMonth).format('MM-YYYY');

  let orderByMonth = result1.filter((item) => item.name === orderMonthFormat);
  console.log('orderByMonth', orderByMonth);
  try {
    res.status(200).json({
      status: 'success',
      result: orderByMonth.length,
      data: orderByMonth,
    });
  } catch (err) {
    res.status(400).json({ message: err });
  }
});
exports.orderRevenueStatisticsForYear = catchAsync(async (req, res, next) => {
  const d = new Date();

  let array = await Order.find({
    $or: [{ status: 'Đã nhận' }, { status: 'Đã đánh giá' }],
  }).sort({ createdAt: 1 });
  console.log('array', array);

  let result = _(array)
    .groupBy((x) => moment(x.createdAt).format('MM-YYYY'))
    .map((value, key) => ({ name: key, orderRevenue: value }))
    .value();

  // 👇️ All days in March of 2022
  // console.log(array);

  // console.log('dayLabel', dayLabel.reverse());
  // console.log('moment().day(-7).toDate()', moment().day(-6).toDate());

  // console.log('week', moment().startOf('week').isoWeekday(8).toDate());
  try {
    res.status(200).json({
      status: 'success',
      result: result.length,
      data: result,
    });
  } catch (err) {
    res.status(400).json({ message: err });
  }
});
