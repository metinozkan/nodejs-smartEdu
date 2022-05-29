const User = require('../models/User');
const bcrypt = require('bcryptjs');
const session = require('express-session');

exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);

    res.status(201).json({
      status: 'success',
      user,
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
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
            res.status(200).redirect('/');
          } else {
            res.status(400).send('Password wrong');
          }
        });
      }
    }
  } catch (error) {
    console.log('loginUser gataya düştü ya', req.body);
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};

exports.logoutUser = async (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
};
