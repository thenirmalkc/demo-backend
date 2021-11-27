'use strict';

const mongoose = require('mongoose');
const fs = require('fs');

const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_NAME = process.env.DB_NAME;

// Connecting to MongoDB Atlas
const url =
  'mongodb+srv://' +
  DB_USER +
  ':' +
  DB_PASS +
  '@cluster0.5sucp.mongodb.net/' +
  DB_NAME +
  '?retryWrites=true&w=majority';
mongoose.connect(url);
const db = mongoose.connection;

db.on('error', () => console.log('Database connection error !!'));

db.once('open', function () {
  console.log('Database connection successful !!');
});

// Adding all model to model variable
const files = fs.readdirSync(__dirname);
const model = {};

for (let i = 0; i < files.length; i++) {
  if (files[i] == 'index.js') continue;
  else {
    const obj = require('./' + files[i]);
    model[obj.collection.modelName] = obj;
  }
}

module.exports = model;
