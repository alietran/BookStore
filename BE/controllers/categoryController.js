const factory = require('../controllers/handlerFactory');
const Category = require('../models/Category');
const catchAsync = require('../utils/catchAsync');

exports.getDetailCategory = factory.getOne(Category);
exports.updateCategory = factory.updateOne(Category);
exports.deleteCategory = factory.deleteOne(Category);
exports.createCategory = factory.createOne(Category);
exports.getAllCategory = factory.getAll(Category, { path: 'subcategorys' });
 

// exports.createRootCate = catchAsync(async (req, res) => {

//   const name = req.body.name;
//   const parentCateId = req.body.parentCateId;


//   const categoryRoot = new MODEL_CINEMAS({
//     name,
//     parentCateId,
//     // seatsTotal,
//   });
//   categoryRoot
//     .save()
//     .then((data) => {
//       // console.log("data", data);
//       return res.status(200).send(data);
//     })
//     .catch((error) => {
//       res.status(500).json(error);
//     });
// }); 