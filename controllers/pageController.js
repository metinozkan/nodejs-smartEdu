const User = require('../models/User');
const Category = require('../models/Category');
const Course = require('../models/Course');
const nodemailer = require('nodemailer');

exports.getIndexPage = (req, res) => {
  res.status(200).render('index', {
    page_name: 'index',
  });
};

exports.getAboutPage = (req, res) => {
  res.status(200).render('about', {
    page_name: 'about',
  });
};

exports.getRegisterPage = (req, res) => {
  res.status(200).render('register', {
    page_name: 'register',
  });
};

exports.getLoginPage = (req, res) => {
  res.status(200).render('login', {
    page_name: 'login',
  });
};

exports.getDashboardPage = async (req, res) => {
  const user = await User.findOne({ _id: req.session.userID }).populate(
    'courses'
  );
  const categories = await Category.find();
  const courses = await Course.find({ user: req.session.userID });

  res.status(200).render('dashboard', {
    page_name: 'dashboard',
    user,
    categories,
    courses,
  });
};

exports.getContactPage = (req, res) => {
  res.status(200).render('contact', {
    page_name: 'contact',
  });
};

exports.sendEmail = async (req, res) => {
  const outputMessage = `
  <h1>Mail details</h1>
  <ul>
  <li>Name: ${req.body.name}</li>
  <li>Email:${req.body.email}</li>
  </ul>

  <h2>Message</h2>
  <p>${req.body.message}</p>
  
  `;

  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: 'metin.ozkn1@gmail.com', //gmail
      pass: 'zvfhstspmjmindrf', // gmail pass
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Smart Edu Contact 👻" <metin.ozkn1@gmail.com>', // sender address
    to: 'metin.ozkn@hotmail.com', // list of receivers
    subject: 'Smart Edu Contact Form :Hello ✔', // Subject line
    html: outputMessage,
  });

  console.log('Message sent: %s', info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

  res.status(200).redirect('/contact');
};
