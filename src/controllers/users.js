'use strict';

const model = require('../models/index');

exports.getUsers = async (req, res) => {
  try {
    const users = await model.User.find()
      .select('-role -password -webToken -mobileToken') // excluding fields
      .lean();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ route: '/users', method: 'get' });
  }
};

exports.getUsersCount = async (req, res) => {
  try {
    const count = await model.User.estimatedDocumentCount();
    res.status(200).json(count);
  } catch (error) {
    res.status(500).json({ route: '/users/count', method: 'get' });
  }
};
