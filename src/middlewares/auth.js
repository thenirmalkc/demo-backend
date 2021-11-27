'use strict';

const jwt = require('jsonwebtoken');

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

exports.ADMIN = 'ADMIN';
exports.SUPER_ADMIN = 'SUPER_ADMIN';
exports.USER = 'USER';

exports.Auth = (...roles) => {
  return function (req, res, next) {
    if (!req.headers.authorization)
      return res.status(401).json({ msg: 'Unauthorized' });

    const accessToken = req.headers.authorization.split(' ')[1];

    jwt.verify(accessToken, ACCESS_TOKEN_SECRET, function (error, data) {
      if (error) return res.status(401).json({ msg: 'Unauthorized' });
      if (!roles.length) req.user = { id: data.userId, role: data.role };
      for (let i = 0; i < roles.length; i++) {
        if (data.role == roles[i]) {
          req.user = { id: data.userId, role: data.role };
          break;
        }
      }
      if (!req.user) return res.status(403).json({ msg: 'Forbidden' });
      next();
    });
  };
};
