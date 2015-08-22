'use strict';

var express = require('express');
var controller = require('./scripts.controller.js');

var router = express.Router();

router.post('/add', controller.addNewScript);

module.exports = router;
