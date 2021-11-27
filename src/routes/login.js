'use strict';

const router = require('express').Router();
const controller = require('../controllers/login');
const { generateWebTokens } = require('../middlewares/auth');

router.post('/', controller.loginUser, generateWebTokens);

module.exports = router;
