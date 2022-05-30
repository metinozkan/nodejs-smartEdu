const User = require('../models/User');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const { validationResult } = require('express-validator');

exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);

    res.status(201).redirect('/login');
  } catch (error) {
    const errors = validationResult(req);

    for (let i = 0; i < errors.array().length; i++) {
      req.flash('error', errors.array()[i].msg);
    }

    res.status(400).redirect('/register');
  }
};

exports.loginUser = async (req, res) => {
  console.log('loginUser');
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      if (user) {
        bcrypt.compare(password, user.password, (err, same) => {
          if (same) {
            // USER SESSION
            req.session.userID = user._id;
            res.status(200).redirect('/dashboard');
          } else {
            req.flash('error', 'Your password is not correct');
            res.status(400).redirect('/login');
          }
        });
      }
    } else {
      req.flash('error', 'User is not exists');
      res.status(400).redirect('/login');
    }
  } catch (error) {
    const errors = validationResult(req);
    for (let i = 0; i < errors.array().length; i++) {
      req.flash('error', errors.array()[i].msg);
    }
    res.status(400).redirect('/login');
  }
};

exports.logoutUser = async (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
};
