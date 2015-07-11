'use strict';

var express = require('express');
var controller = require('./users.controller.js');

var router = express.Router();

router.post('/add', controller.addUser);
router.post('/:username/activate/:password', controller.activateUser);

module.exports = router;
