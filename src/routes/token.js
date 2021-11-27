'use strict';

const router = require('express').Router();
const controller = require('../controllers/token');

router.get('/refresh', controller.refreshWebTokens);

module.exports = router;
