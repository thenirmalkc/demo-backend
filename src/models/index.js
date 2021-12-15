'use strict';

const mongoose = require('mongoose');
const fs = require('fs');

// Database URL
const DB_URL = process.env.DB_URL;

// Connecting to MongoDB Atlas
mongoose.connect(DB_URL);
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
    const obj = require('@models/' + files[i]);
    model[obj.collection.modelName] = obj;
  }
}

module.exports = model;
