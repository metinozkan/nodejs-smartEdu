const User = require('../models/User');
const bcrypt = require('bcryptjs');

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
            res.status(200).send('You ARE LOGGED IN');
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
