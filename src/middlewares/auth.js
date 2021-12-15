'use strict';

const jwt = require('jsonwebtoken');

const model = require('@models/index');

// -- For Web Tokens --
// Refresh token
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
const exp1 = { expiresIn: 3600 }; // refresh token expire time
// Access token
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const exp2 = { expiresIn: 300 }; // access token expire time
// -- --

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

exports.generateWebTokens = async (req, res) => {
  try {
    await model.User.updateOne(
      { _id: req.body._id },
      { webToken: ++req.body.webToken }
    );
    const refreshTokenData = {
      userId: req.body._id,
      role: req.body.role,
      count: req.body.webToken
    };
    const accessTokenData = {
      userId: req.body._id,
      role: req.body.role
    };
    const tokens = {};

    jwt.sign(
      refreshTokenData,
      REFRESH_TOKEN_SECRET,
      exp1,
      function (error, token) {
        tokens.refreshToken = token;
        jwt.sign(
          accessTokenData,
          ACCESS_TOKEN_SECRET,
          exp2,
          function (error, token) {
            tokens.accessToken = token;
            res.status(200).json(tokens);
          }
        );
      }
    );
  } catch (error) {
    res.status(500).json({ msg: 'Generate Tokens' });
  }
};

exports.refreshWebTokens = async (req, res) => {
  if (!req.headers.authorization)
    return res.status(401).json({ msg: 'Unauthorized' });

  const refreshToken = req.headers.authorization.split(' ')[1];

  jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, async function (error, data) {
    if (error) return res.status(401).json({ msg: 'Unauthorized' });
    try {
      const user = await model.User.findOne({ _id: data.userId })
        .select('_id webToken')
        .lean();

      if (user.webToken != data.count)
        return res.status(401).json({ msg: 'Unauthorized' });

      await model.User.updateOne(
        { _id: data.userId },
        { webToken: ++data.count }
      );

      const refreshTokenData = {
        userId: data.userId,
        role: data.role,
        count: data.count
      };
      const accessTokenData = {
        userId: data.userId,
        role: data.role
      };
      const tokens = {};

      jwt.sign(
        refreshTokenData,
        REFRESH_TOKEN_SECRET,
        exp1,
        function (error, token) {
          tokens.refreshToken = token;
          jwt.sign(
            accessTokenData,
            ACCESS_TOKEN_SECRET,
            exp2,
            function (error, token) {
              tokens.accessToken = token;
              res.status(200).json(tokens);
            }
          );
        }
      );
    } catch (error) {
      res.status(500).json({ msg: 'Refresh Tokens' });
    }
  });
};
