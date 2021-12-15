'use strict';

const router = require('express').Router();
const model = require('@models/index');
const controller = require('@controllers/item');
const { Auth } = require('@middlewares/auth'); // Authorization middleware
const { USER } = require('@constants/role');
const { Valid_Id, Doc_Exists, Doc_Owner } = require('@middlewares/validation'); // Validation middleware

router.post('/', Auth(USER), controller.createItem);
router.get('/:id', Valid_Id, Doc_Exists(model.Item), controller.getItemById);
router.put(
  '/:id',
  Auth(USER),
  Valid_Id,
  Doc_Exists(model.Item),
  Doc_Owner(model.Item),
  controller.updateItemById
);
router.delete(
  '/:id',
  Auth(USER),
  Valid_Id,
  Doc_Exists(model.Item),
  Doc_Owner(model.Item),
  controller.deleteItemById
);

module.exports = router;
