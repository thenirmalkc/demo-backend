'use strict';

const mongoose = require('mongoose');

exports.Not_Found = function (req, res) {
  res.status(404).json({ msg: 'Not Found' });
};

exports.Valid_Id = function (req, res, next) {
  const flag = mongoose.Types.ObjectId.isValid(req.params.id);
  if (!flag) return res.status(404).json({ msg: 'Invalid Id' });
  next();
};

exports.Doc_Exists = function (model) {
  return async function (req, res, next) {
    const flag = await model.exists({ _id: req.params.id });
    if (!flag) return res.status(404).json({ msg: 'Not Found' });
    next();
  };
};

exports.Doc_Owner = function (model, allow = []) {
  return async function (req, res, next) {
    if (allow.includes(req.user.role)) return next();
    const flag = await model.exists({
      _id: req.params.id,
      userId: req.user.id
    });
    if (!flag) return res.status(403).json({ msg: 'Forbidden' });
    next();
  };
};

exports.Not_Doc_Owner = function (model) {
  return async function (req, res, next) {
    const flag = await model.exists({
      _id: req.params.id,
      userId: req.user.id
    });
    if (flag) return res.status(403).json({ msg: 'Forbidden' });
    next();
  };
};
