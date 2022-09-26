const factory = require('../controllers/handlerFactory');
const Book = require('../models/Book');
const catchAsync = require('../utils/catchAsync');
const mkdirp = require('mkdirp');
const multer = require('multer');
const AppError = require('../utils/appError');
const fullTextSearch = require('fulltextsearch');
var fullTextSearchVi = fullTextSearch.vi;
const cloudinary = require('../utils/cloudinary');

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
  if (gallery.length > 0 && image !== '') {
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
