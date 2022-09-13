const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const router = express.Router();
const jwt = require('jsonwebtoken');

const passport = require('passport');

const successLoginURL = 'http://localhost:3000';
const errorLoginURL = 'http://localhost:3000/login/failed"';

router.route('/').get(userController.getAllUser);

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

router.post('/createUser', userController.createUser);
router.post('/getUserLoginOtp', userController.getUserLoginOtp);

router.get('/login/failed', (req, res) => {
  res.status(401).json({
    success: false,
    message: 'failure',
  });
});

router.patch('/updateMe', authController.protectUser,userController.updateMe);

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
    failureMessage: 'Cannot login to Google, please try again later!',
    failureRedirect: errorLoginURL,
    successRedirect: successLoginURL,
    session: true,
  }),
  (req, res) => {}
);

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect(successLoginURL);
});

// router.route('/:id').put(userController.updateUser);

module.exports = router;
