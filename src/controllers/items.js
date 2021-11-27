'use strict';

const model = require('../models/index');

exports.getItems = async (req, res) => {
  try {
    const items = await model.Item.find().lean();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ route: '/items', method: 'get' });
  }
};

exports.getItemsCount = async (req, res) => {
  try {
    const count = await model.Item.estimatedDocumentCount();
    res.status(200).json(count);
  } catch (error) {
    res.status(500).json({ route: '/items/count', method: 'get' });
  }
};
