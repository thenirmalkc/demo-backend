'use strict';

const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const { ADMIN, SUPER_ADMIN, USER } = require('../utils/role');

const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      trim: true,
      required: [true, 'First name is required']
    },
    lastName: {
      type: String,
      trim: true,
      required: [true, 'Last name is required']
    },
    email: {
      type: String,
      trim: true,
      index: { unique: true }, // Unique index to search user by email
      required: [true, 'Email is required']
    },
    address: {
      type: String,
      trim: true,
      required: [true, 'Address is required']
    },
    role: {
      type: String,
      default: 'USER',
      enum: [ADMIN, SUPER_ADMIN, USER]
    },

    // Authentication
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [8, 'Password length must be minimum of 8 characters']
    },
    // Authorization
    webToken: {
      type: Number,
      default: 0
    },
    mobileToken: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

UserSchema.pre('save', async function (next) {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

module.exports = model('User', UserSchema);
