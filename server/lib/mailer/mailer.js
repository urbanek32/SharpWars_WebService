'use strict';

var nodemailer = require('nodemailer'),
  config = require('../../config/customConfig');

var transporter = nodemailer.createTransport({
  host: config.emailAccount.host,
  port: config.emailAccount.port,
  tls: {
    rejectUnauthorized: false
  },
  auth: {
    user: config.emailAccount.email,
    pass: config.emailAccount.password
  }
});

module.exports = transporter;
