'use strict';

const bcrypt = require('bcrypt');
const model = require('../models/index');

exports.loginUser = async (req, res, next) => {
  try {
    let validationErrors = [];
    if (!req.body.email)
      validationErrors.push({ name: 'email', msg: 'Email is required' });
    if (!req.body.password)
      validationErrors.push({ name: 'password', msg: 'Password is required' });
    if (validationErrors.length) return res.status(422).json(validationErrors);

    const user = await model.User.findOne({ email: req.body.email })
      .select('_id role password webToken mobileToken')
      .lean();

    if (!user) return res.status(401).json({ msg: 'Unauthorized' });
    const value = await bcrypt.compare(req.body.password, user.password);
    if (!value) return res.status(401).json({ msg: 'Unauthorized' });
    req.body = user;
    next();
  } catch (error) {
    res.status(500).json({ route: '/login', method: 'post' });
  }
};
