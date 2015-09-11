'use strict';

var express = require('express');
var controller = require('./users.controller.js');

var router = express.Router();

router.post('/add', controller.addUser);
router.get('/:username/activate/:token', controller.activateUser);
router.post('/login', controller.logInUser);
router.post('/forgot_password', controller.forgotPassword);
router.post('/reset_password/:username/:token', controller.resetPassword);

module.exports = router;
