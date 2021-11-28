'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { Not_Found } = require('./middlewares/validation');

// Cors Enabled
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.use(express.json()); // JSON
app.use(bodyParser.urlencoded({ extended: false })); // Body Parser

// Routes
app.use('/item', require('./routes/item'));
app.use('/items', require('./routes/items'));
app.use('/login', require('./routes/login'));
app.use('/register', require('./routes/register'));
app.use('/token', require('./routes/token'));
app.use('/user', require('./routes/user'));
app.use('/users', require('./routes/users'));

app.use('/test', () => res.status(200).json({ msg: 'Welcome to my api' }));
app.use('/', Not_Found);

module.exports = app;
