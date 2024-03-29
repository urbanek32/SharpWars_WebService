'use strict';

var express = require('express');
var controller = require('./users.controller.js');

var router = express.Router();

router.post('/change_password', controller.changePasswordUsingCurrentPwd);
router.get('/:username/profile', controller.getUserInformations);
router.put('/:username/profile', controller.updateUserInformations);

module.exports = router;
