'use strict';

module.exports = {
  webservice: {
    host: 'http://192.168.56.101',
    port: '9000'
  },
  emailAccount: {
    host: "mail.daruhq.tk",
    port: 587,
    email: "jiraya",
    password: "jiraya1"
  },
  logger: {
    file: "logs/webservice.log",
    level: "debug"
  },
  auth: {
    key: "koksyinzynierki2015",
    expirationTokenTime: 5*60 //in minutes
  }
};
