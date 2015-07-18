'use strict';

var userEntities = require('../entities/users-entities'),
  httpStatuses = require('../components/httpStatuses').httpStatuses,
  passwordHash = require('password-hash'),
  mailer = require('../lib/mailer/mailer'),
  config = require('../config/customConfig'),
  logger = require('../lib/logger/logger').init(),
  jwt = require('jsonwebtoken');


var sendActivationEmail = function(newUser, callback) {
  var mailOptions = {
    from: 'jiraya@daruhq.tk',
    to: newUser.email,
    subject: '[WebService] Activation account',
    text: config.webservice.host + ':' + config.webservice.port + '/api/users/' + newUser.username + '/activate/' + newUser.password
  };
  mailer.sendMail(mailOptions, function(err, result){
    callback(err, result);
  });
};

var addUser = function(newUser, callback) {
  userEntities.findUserByEmail(newUser.email, function(err, user){
    if(!err) {
      if(!user) {
        userEntities.findUserByUsername(newUser.username, function(err, user) {
          if(!err) {
            if(!user) {
              newUser.password = passwordHash.generate(newUser.password);
              newUser.activated = false;
              userEntities.addUser(newUser, function(err, result) {
                if(!err) {
                  logger.debug("User " + newUser.username + " has been created in database.");
                  sendActivationEmail(newUser, function(err, result) {
                    if(!err) {
                      logger.debug("Email with activation link was sent to " + newUser.email);
                      callback(null, httpStatuses.Users.Created);
                    } else {
                      userEntities.deleteUserByEmail(newUser.email, function(err, result){
                        if(err && !result) {
                          callback(err, null);
                        }
                      });
                      logger.error("Cannot send email: " + JSON.stringify(err));
                      callback(httpStatuses.Generic.InternalServerError, null);
                    }
                  })
                } else {
                  logger.error("Internal Server Error: " + JSON.stringify(err));
                  callback(err, null);
                }
              });
            } else {
              logger.debug("Cannot add user: username " + newUser.username + " already exists.");
              callback(httpStatuses.Users.AlreadyExists, null);
            }
          } else {
            logger.error("Internal Server Error: " + JSON.stringify(err));
            callback(err, null);
          }
        })
      } else {
        logger.debug("Cannot add user: email " + newUser.email + " already exists.");
        callback(httpStatuses.Users.AlreadyExists, null);
      }
    } else {
      logger.error("Internal Server Error: " + JSON.stringify(err));
      callback(err, null);
    }
  });
};

var activateUser = function(options, callback) {
  userEntities.findUserByUsername(options.username, function(err, user) {
    if(!err) {
      if(user) {
        if(!user.activated) {
          if (options.password === user.password) {
            userEntities.activateByUsername(options.username, function (err, result) {
              if (!err && result) {
                logger.debug("User has been activated.");
                callback(null, httpStatuses.Users.Activated, result);
              } else {
                logger.error("Internal Serever Error: " + JSON.stringify(err));
                callback(httpStatuses.Generic.InternalServerError, null);
              }
            });
          } else {
            logger.debug("Cannot activate user: Passwords don't match.");
            callback(httpStatuses.Auth.Unauthorized, null);
          }
        } else {
          logger.debug("Cannot activate user: User " + options.username + " already activated.");
          callback(httpStatuses.Users.AlreadyActivated, null);
        }
      } else {
        logger.debug("Cannot activate user: User " + options.username + " not exists.");
        callback(httpStatuses.Users.NotExists, null);
      }
    } else {
      logger.error("Internal Server Error: " + JSON.stringify(err));
      callback(httpStatuses.Generic.InternalServerError, null)
    }
  });
};

var logInUser = function(options, callback) {
  userEntities.findUserByUsername(options.username, function(err, user) {
    if(!err) {
      if(user) {
        if(passwordHash.verify(options.password, user.password)) {
          if(user.activated) {
            var token = jwt.sign(user, config.auth.key, { expiresInMinutes: config.auth.expirationTokenTime });
            logger.debug('User authorized: Token send.');
            callback(null, {token: token});
          } else {
            logger.debug("Cannot log in user: User not activated.");
            callback(httpStatuses.Users.NotActivated, null);
          }
        } else {
          logger.debug("Cannot log in user: Password or login incorrect.");
          callback(httpStatuses.Auth.Unauthorized, null);
        }
      } else {
        logger.debug("Cannot log in user: User " + options.username + " not exists.");
        callback(httpStatuses.Users.NotExists, null);
      }
    } else {
      logger.error("Internal Server Error: " + JSON.stringify(err));
      callback(httpStatuses.Generic.InternalServerError, null)
    }
  });
};

module.exports = {
  addUser: addUser,
  activateUser: activateUser,
  logInUser: logInUser
};
