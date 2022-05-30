const express = require('express');
const { body } = require('express-validator');

const authController = require('../controllers/authController');
const User = require('../models/User');

const router = express.Router();

router.route('/signup').post(
  [
    body('name').not().isEmpty().withMessage('Please Enter Your Name'),
    body('email')
      .isEmail()
      .withMessage('Please valid email!')
      .custom((userEmail) => {
        return User.find({ email: userEmail }).then((user) => {
          if (user) {
            return Promise.reject('Email already exists');
          }
        });
      }),
    body('password').not().isEmpty().withMessage('Please Enter Password'),
  ],
  authController.createUser
);
router.route('/login').post(authController.loginUser);
router.route('/logout').get(authController.logoutUser);

module.exports = router;
