'use strict';

const model = require('../models/index');
const formatError = require('../helpers/formatError');

exports.createItem = async (req, res) => {
  try {
    req.body.userId = req.user.id;
    const item = await model.Item.create(req.body);
    res.status(200).json(item);
  } catch (error) {
    if (error.name == 'ValidationError')
      return res.status(422).json(formatError(error));
    res.status(500).json({ route: '/item', method: 'post' });
  }
};

exports.updateItemById = async (req, res) => {
  try {
    await model.Item.updateOne({ _id: req.params.id }, req.body, {
      runValidators: true
    });
    const item = await model.Item.findOne({ _id: req.params.id }).lean();
    res.status(200).json(item);
  } catch (error) {
    console.log(error);
    if ((error.name = 'ValidationError'))
      return res.status(422).json(formatError(error));
    res.status(500).json({ route: '/item', method: 'put' });
  }
};

exports.getItemById = async (req, res) => {
  try {
    const item = await model.Item.findOne({ _id: req.params.id }).lean();
    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ route: '/item/:id', method: 'get' });
  }
};

exports.deleteItemById = async (req, res) => {
  try {
    await model.Item.deleteOne({ _id: req.params.id });
    res.status(200).json(true);
  } catch (error) {
    res.status(500).json({ route: '/item/:id', method: 'delete' });
  }
};
