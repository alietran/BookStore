const express = require('express');

const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const router = express.Router();

// const passport = require('passport');

// const successLoginURL = 'http://localhost:3000';
// const errorLoginURL = 'http://localhost:3000/login';

router.post('/createUser', authController.signup);
router.post('/login', authController.login);
router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);
module.exports = router;