'use strict';

const router = require('express').Router();
const controller = require('../controllers/register');
const { generateWebTokens } = require('../controllers/token');

router.post('/', controller.registerUser, generateWebTokens);

module.exports = router;
