'use strict';

const model = require('../models/index');
const formatError = require('../utils/formatError');
const { USER } = require('../middlewares/auth');

exports.registerUser = async (req, res, next) => {
  try {
    // Checking if email already registered
    const flag = await model.User.exists({ email: req.body.email });
    if (flag)
      return res
        .status(422)
        .json([{ name: 'email', msg: 'Email already registered' }]);

    req.body.role = USER; // Assigning user a fixed role
    const user = await model.User.create(req.body);
    req.body = user;
    next();
  } catch (error) {
    console.log(error);
    if (error.name == 'ValidationError')
      return res.status(422).json(formatError(error));
    res.status(500).json({ route: '/register', method: 'post' });
  }
};
