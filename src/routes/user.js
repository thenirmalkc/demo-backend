'use strict';

const router = require('express').Router();
const model = require('../models/index');
const controller = require('../controllers/user');
const { Auth, ADMIN } = require('../middlewares/auth');
const { Valid_Id, Doc_Exists } = require('../middlewares/validation');

router.post('/', Auth(ADMIN), controller.createUser);
router.put('/', Auth(), controller.updateUser);
router.get('/:id', Valid_Id, Doc_Exists(model.User), controller.getUserById);

module.exports = router;
