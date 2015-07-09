'use strict';

var express = require('express');
var controller = require('./users.controller.js');

var router = express.Router();

router.post('/add', controller.addUser);

module.exports = router;
