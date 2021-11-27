'use strict';

const router = require('express').Router();
const controller = require('../controllers/users');

router.get('/', controller.getUsers);
router.get('/count', controller.getUsersCount);

module.exports = router;
