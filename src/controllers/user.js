'use strict';

const model = require('../models/index');
const formatError = require('../helpers/formatError');

exports.createUser = async (req, res) => {
  try {
    // Checking if email already registered
    const flag = await model.User.exists({ email: req.body.email });
    if (flag)
      return res
        .status(422)
        .json([{ name: 'email', msg: 'Email already registered' }]);

    const user = await model.User.create(req.body);
    res.status(200).json(user);
  } catch (error) {
    if (error.name == 'ValidationError')
      return res.status(422).json(formatError(error));
    res.status(500).json({ route: '/user', method: 'post' });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const deleteFields = [
      'email',
      'role',
      'password',
      'webToken',
      'mobileToken'
    ];
    deleteFields.map(field => delete req.body[field]);
    await model.User.updateOne({ _id: req.user.id }, req.body, {
      runValidators: true
    });
    const user = await model.User.findOne({ _id: req.user.id }).lean();
    res.status(200).json(user);
  } catch (error) {
    if (error.name == 'ValidationError')
      return res.status(422).json(formatError(error));
    res.status(500).json({ route: '/user', method: 'put' });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await model.User.findOne({ _id: req.params.id })
      .select('-role -password -webToken -mobileToken') // excluding fields
      .lean();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ route: '/user/:id', method: 'get' });
  }
};
