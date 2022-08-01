const express = require('express');

const authController = require('../controllers/authController');
const adminController = require('../controllers/adminController');
const router = express.Router();


router.post('/createUser', authController.signup);
router.post('/login', authController.login);
router.route('/').get(adminController.getAllAdmin);

// .post(adminController.createAdmin)
// .put(adminController.updateAdmin);

router
  .route('/:id')
  // .get(adminController.getDetailAdmin)
  .put(adminController.updateAdmin)
  .delete(adminController.deleteAdmin);


router.post('/createUser', authController.signup);


router.patch(
  '/updateMe',
  authController.protect,
  adminController.uploadUserPhoto,
  adminController.updateMe
);

router.patch(
  '/updateMyPassword',
  authController.protect,
  authController.updatePassword
);

module.exports = router;
