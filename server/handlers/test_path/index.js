'use strict';

var express = require('express');
var controller = require('./testing.controller.js');

var router = express.Router();

router.get('/test_a', controller.testJson);
router.post('/test_b', controller.testString);

module.exports = router;
