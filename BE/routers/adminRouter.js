const express = require('express');

const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const authMiddlewares = require('../middlewares/auth');
const router = express.Router();
const jwt = require('jsonwebtoken');

const passport = require('passport');

const successLoginURL = 'http://localhost:3000';
const errorLoginURL = 'http://localhost:3000/login/failed"';

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

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

router.get('/login/failed', (req, res) => {
  res.status(401).json({
    success: false,
    message: 'failure',
  });
});

router.get('/login/success', (req, res) => {

  if (req.user) {
    const token = signToken(req.user.id);
    res.status(200).json({
      status: 'success',
      user: req.user,
      cookies: req.cookies,
      token,
    });
  }
});

router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    session: false,
  })
);

router.get(
  '/google/callback',
  passport.authenticate('google', {
    // failureMessage: 'Cannot login to Google, please try again later!',
    failureRedirect: errorLoginURL,
    successRedirect: successLoginURL,
    session: true,
  }),
  (req, res) => {
    console.log('User1234:', req.user);
    console.log('User12345:', req.session);
    res.redirect('/');
  }
);

router.post('/createUser', authController.signup);

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect(successLoginURL);
});

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
