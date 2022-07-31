const express = require('express');

const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const router = express.Router();


router.post('/createUser', authController.signup);
router.post('/login', authController.login);
router.route('/').get(userController.getAllUsers);

// .post(userController.createUser)
// .put(userController.updateUser);

router
  .route('/:id')
  // .get(userController.getDetailUser)
  .put(userController.updateUser)
  .delete(userController.deleteUser);


router.post('/createUser', authController.signup);


router.patch(
  '/updateMe',
  authController.protect,
  userController.uploadUserPhoto,
  userController.updateMe
);

router.patch(
  '/updateMyPassword',
  authController.protect,
  authController.updatePassword
);

module.exports = router;
