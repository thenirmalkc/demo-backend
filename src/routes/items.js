'use strict';

const router = require('express').Router();
const controller = require('@controllers/items');

router.get('/', controller.getItems);
router.get('/count', controller.getItemsCount);

module.exports = router;
