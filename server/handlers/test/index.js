'use strict';

var express = require('express');
var controller = require('./test.controller.js');

var router = express.Router();

router.get('/test_empty_body', controller.testEmptyBodyGet);
router.post('/test_empty_body', controller.testEmptyBodyPost);
router.put('/test_empty_body', controller.testEmptyBodyPut);

router.post('/test_string_body', controller.testStringBodyPost);
router.put('/test_string_body', controller.testStringBodyPut);

router.post('/test_multiple_body', controller.testMultipleBodyPost);
router.put('/test_multiple/:number', controller.testMultiplePut);



module.exports = router;
