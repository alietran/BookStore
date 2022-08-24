const factory = require('../controllers/handlerFactory');
const Book = require('../models/Book');
const catchAsync = require('../utils/catchAsync');
const mkdirp = require('mkdirp');
const multer = require('multer');
const AppError = require('../utils/appError');

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
  const { gallery, image } = req.files;
  let newArray = [];
  gallery?.map((files) => {
    const path = files.path.replace(/\\/g, '/').substring('public'.length);
    const urlGallery = `http://localhost:8080${path}`;
    newArray.push(urlGallery);
  });

  if (req.files.gallery) req.body.gallery = newArray;
  if (image !== undefined) {
    const path = image[0]?.path.replace(/\\/g, '/').substring('public'.length);
    const urlImage = `http://localhost:8080${path}`;

    if (req.files.image) req.body.image = urlImage;
  }

  const _id = req.params.id;

  const doc = await Book.findByIdAndUpdate(_id, req.body, {
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
});

exports.createBook = catchAsync(async (req, res, next) => {
  const { gallery, image } = req.files;
  let newArray = [];
  gallery?.map((files) => {
    const path = files.path.replace(/\\/g, '/').substring('public'.length);
    const urlGallery = `http://localhost:8080${path}`;
    newArray.push(urlGallery);
  });

  if (req.files.gallery) req.body.gallery = newArray;
  const path = image[0].path.replace(/\\/g, '/').substring('public'.length);
  const urlImage = `http://localhost:8080${path}`;

  if (req.files.image) req.body.image = urlImage;

  const doc = await Book.create(req.body);
  console.log('doc', doc);

  res.status(201).json({
    status: 'success',
    result: doc.length,
    data: doc,
  });
});

exports.deleteBook = factory.deleteOne(Book);
exports.getAllBook = factory.getAll(Book);
