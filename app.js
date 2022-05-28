const express = require('express');
const pageRoute = require('./routes/pageRoute.js');

const app = express();

//template engine
app.set('view engine', 'ejs');

//Middlewares
app.use(express.static('public'));

const port = 3000;

app.use('/', pageRoute);

app.listen(port, () => {
  console.log('app start');
});
