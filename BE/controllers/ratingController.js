const Rating = require('../models/ratingModel');
const factory = require('./handlerFactory');
const catchAsync = require('../utils/catchAsync');
const cloudinary = require('../utils/cloudinary');
const multer = require('multer');

exports.getAllRating = factory.getAll(Rating);
exports.getDetailRating = factory.getOne(Rating);

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/img/ratings');
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

exports.uploadImageRating = upload.fields([
  { name: 'imageRating', maxCount: 4 },
]);

const filterObj = (obj, ...allowedField) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedField.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.createRating = catchAsync(async (req, res, next) => {
  let arrayItems = [];
  let count = 0;
  req.body.map((item) => {
    if (item.imageRating.length > 0) {
      //imageRating base64
      item.imageRating.map(async (image) => {
        const uploadedResponse = await cloudinary.uploader.upload(image, {
          upload_preset: 'image_rating',
        });
        let product = {
          book: item.book,
          imageRating: [uploadedResponse.secure_url],
          order: item.order,
          content: item.content,
          rating: item.rating,
        };

        let index = arrayItems.findIndex((item2) => item2.book === item.book);
        if (index !== -1) {
          arrayItems[index].imageRating = [
            ...arrayItems[index].imageRating,
            uploadedResponse.secure_url,
          ];
          count++;
        } else {
          arrayItems.push(product);
          count++;
        }
        let res = req.body.reduce((total, item3) => {
          return (total += item3.imageRating.length);
        }, 0);
        console.log('item.book', item.book);
        let a = [];
        if (res === count) {
          console.log('arrayItems', arrayItems);
          arrayItems.map((item3) => {
            item.imageRating = item3.imageRating;
            a.push(item3);
          });
        }
        a.map((item4) => {
          item.imageRating = item4.imageRating;
        });
        const rating = await Rating.insertMany(a);
        console.log('rating', rating);

        // console.log('req.body[0].imageRating[0]', req.body[0].imageRating[0]);
      });
    }
  });
});

exports.bookRatingDetail = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log('bookId', id);

  const doc = await Rating.find({ book: id }).sort({ createdAt: -1 });

  if (!doc) {
    return next(new AppError('No document found with that ID', 404));
  }

  res.status(201).json({
    status: 'success',
    result: doc.length,
    data: doc,
  });
});
exports.likeRating = factory.updateOne(Rating);
exports.deleteRating = factory.deleteOne(Rating);
