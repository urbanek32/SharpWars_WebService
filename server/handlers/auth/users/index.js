'use strict';

var express = require('express');
var controller = require('./users.controller.js');

var router = express.Router();

router.post('/change_password', controller.changePasswordUsingCurrentPwd);

module.exports = router;
