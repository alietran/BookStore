const express = require('express');

const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const authMiddlewares = require('../middlewares/auth');
const router = express.Router();

const passport = require('passport');

const successLoginURL = 'http://localhost:3000';
const errorLoginURL = 'http://localhost:3000/login/failed"';

router.post('/createUser', authController.signup);
router.post('/login', authController.login);
router.route('/').get(userController.getAllUsers);

// .post(userController.createUser)
// .put(userController.updateUser);

router
  .route('/:id')
  .get(userController.getDetailUser)
  .put(userController.updateUser)
  .delete(userController.deleteUser);

router.get('/login/failed', (req, res) => {
  res.status(401).json({
    success: false,
    message: 'failure',
  });
});

router.get('/login/success', (req, res) => {
  console.log('req.session', req.session);
  console.log('req.user123', req.user);
  console.log('req.user1234', req);
  if (req.user) {
    res.status(200).json({
      success: true,
      message: 'successfull',
      user: req.user,
      cookies: req.cookies,
    });
  }
});

router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  })
);

router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureMessage: 'Cannot login to Google, please try again later!',
    failureRedirect: errorLoginURL,
    successRedirect: successLoginURL,
  }),
  (req, res) => {
    console.log('User1234:', req.user);
    // res.send('Thank you for signing in!');
  }
);

router.post('/createUser', authController.signup);

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect(successLoginURL);
});

module.exports = router;
