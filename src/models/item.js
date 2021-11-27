'use strict';

const { Schema, model } = require('mongoose');

const ItemSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, 'Name is required']
    },
    price: {
      type: Number,
      required: [true, 'Price is required']
    },
    description: {
      type: String,
      trim: true,
      required: [true, 'Description is required']
    },
    imagePath: {
      type: String,
      trim: true,
      required: [true, 'Image path is required']
    },
    // One to One Relation with (User model)
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'UserId is required']
    }
  },
  { timestamps: true }
);

module.exports = model('Item', ItemSchema);
