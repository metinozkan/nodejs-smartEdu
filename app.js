const express = require('express');
const mongoose = require('mongoose');
const pageRoute = require('./routes/pageRoute.js');
const courseRoute = require('./routes/courseRoute');
const categoryRoute = require('./routes/categoryRoute');
const userRoute = require('./routes/userRoute');

const app = express();

//Connect db
mongoose.connect('mongodb://localhost:27017/smartedu-db', {}).then(() => {
  console.log('db conencted succesfully');
});

//template engine
app.set('view engine', 'ejs');

//Middlewares
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());

const port = 3000;

app.use('/', pageRoute);
app.use('/courses', courseRoute);
app.use('/category', categoryRoute);
app.use('/users', userRoute);

app.listen(port, () => {
  console.log('app start');
});
