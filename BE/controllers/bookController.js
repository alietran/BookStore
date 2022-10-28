const factory = require('../controllers/handlerFactory');
const Book = require('../models/Book');
const OrderDetail = require('../models/OrderDetail');
const catchAsync = require('../utils/catchAsync');
const mkdirp = require('mkdirp');
const multer = require('multer');
const AppError = require('../utils/appError');
const fullTextSearch = require('fulltextsearch');
var fullTextSearchVi = fullTextSearch.vi;
const cloudinary = require('../utils/cloudinary');
const moment = require('moment');
const _ = require('lodash');

const made = mkdirp.sync('./public/img/books');

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/img/books');
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split('/')[1];
    cb(null, `book-${Date.now()}.${ext}`);
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

exports.uploadBookPhoto = upload.fields([
  { name: 'image', maxCount: 2 },
  { name: 'gallery', maxCount: 8 },
]);

// exports.uploadBookPhoto = upload.single('image');
exports.getDetailBook = factory.getOne(Book);
exports.updateBook = catchAsync(async (req, res, next) => {
  const { gallery, image } = req.body;
  const _id = req.params.id;

  // console.log('gallery', gallery);
  let arrayGallery = [];
  if (gallery?.length > 0 && image !== '') {
    gallery.map(async (item) => {
      // console.log('item ', item);
      const uploadedResponse = await cloudinary.uploader.upload(item, {
        upload_preset: 'image_book',
      });
      arrayGallery.push(uploadedResponse.secure_url);
      if (arrayGallery.length === gallery.length) {
        req.body.gallery = arrayGallery;
        const uploadedImage = await cloudinary.uploader.upload(image, {
          upload_preset: 'image_book',
        });
        req.body.image = uploadedImage.secure_url;
        const doc = await Book.findByIdAndUpdate(_id, req.body);

        res.status(201).json({
          status: 'success',
          result: doc.length,
          data: doc,
        });
      }

      // req.body.image = uploadedImage.secure_url;
      // arrayGallery.push(uploadedResponse.secure_url);
      // console.log('uploadedResponse.secure_url ', uploadedResponse.secure_url);

      // if (arrayGallery.length === gallery.length - 1) {
      //   console.log('arrayGallery.length ', arrayGallery);
      //   res.status(200).json({
      //     status: 'success',
      //   });
      // }
    });
  }
});

exports.createBook = catchAsync(async (req, res, next) => {
  const { gallery, image } = req.body;
  let arrayGallery = [];
  if (gallery.length > 0 && image !== '') {
    gallery.map(async (item, index) => {
      const uploadedResponse = await cloudinary.uploader.upload(item, {
        upload_preset: 'image_book',
      });
      arrayGallery.push(uploadedResponse.secure_url);
      if (arrayGallery.length === gallery.length) {
        req.body.gallery = arrayGallery;
        const uploadedImage = await cloudinary.uploader.upload(image, {
          upload_preset: 'image_book',
        });
        req.body.image = uploadedImage.secure_url;
        const doc = await Book.create(req.body);

        res.status(201).json({
          status: 'success',
          result: doc.length,
          data: doc,
        });
      }
    });
  }
});

exports.deleteBook = factory.deleteOne(Book);
exports.getAllBook = factory.getAll(Book);

exports.searchBook = catchAsync(async (req, res, next) => {
  const { search } = req.query;
  // console.log("search", search)
  var filter = {};
  if (search != '') {
    filter.name = new RegExp(fullTextSearchVi(search), 'i');
  }

  await Book.find(filter).then((records) => {
    res.status(200).json({
      status: 'success',
      result: records.length,
      data: records,
    });
  });
});

// exports.filterBookByPrice = catchAsync(async (req, res, next) => {
//   const { minPrice, maxPrice } = req.body;
//   console.log('valuePrice', req.body);
//   console.log('value', minPrice);
 
//   let array = await Book.find({
//     price: {
//       $gte: Number(minPrice * 1000),
//       $lte: Number(maxPrice * 1000),
//     },
//   }).sort({ createdAt: 1 });


//   res.status(200).json({
//     status: 'success',
//     data: array,
//     // .map((book,index)=>{
//     //   return book.price
//     // }),
//     length: array.length
//   });
// });

exports.latestBook = catchAsync(async (req, res, next) => {
  let doc = await Book.find()
    .sort([['_id', -1]])
    .limit(8);

  res.status(200).json({
    status: 'success',
    result: doc.length,
    data: doc,
  });
});

exports.bestSellerBook = catchAsync(async (req, res, next) => {
  var now = moment();
  var monday = moment().day(-6).toDate();
  var sunday = moment().startOf('week').isoWeekday(8).toDate();
  //   let today = new Date();
  // let firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
  // let lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  console.log('monday', moment().day(-6).toDate());
  console.log('sunday', moment().startOf('week').isoWeekday(8).toDate());
  const array = await OrderDetail.find({
    createdAt: {
      $gte: moment().day(-6).toDate(),
      $lte: moment().startOf('week').isoWeekday(8).toDate(),
    },
  });

  let doc = _(array)
    .groupBy((x) => x.book.id)
    .map((value, key) => ({ name: key, book: value }))
    .value();

  let dat = [];
    console.log('doc',  doc);

  doc.map((item, index) => {
    console.log('item',  item);
    let quantity = item.book.reduce(
      (total, item1) => (total += item1.quantity),
      0
    );

    dat.push({ book: item.book[0].book, quantity });
    // return [...item, quantity];
    // doc[index] = [...doc[index], 'dat'];
  });

  res.status(200).json({
    status: 'success',
    data: dat.sort((a, b) => b.quantity - a.quantity).splice(0, 4),
  });
});
