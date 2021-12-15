'use strict';

const router = require('express').Router();
const { refreshWebTokens } = require('@middlewares/auth');

router.get('/refresh', refreshWebTokens);

module.exports = router;
