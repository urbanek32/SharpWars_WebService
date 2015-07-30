'use strict';

var userEntities = require('../../entities/users-entities'),
  httpStatuses = require('../../components/httpStatuses').httpStatuses,
  passwordHash = require('password-hash'),
  config = require('../../config/customConfig'),
  logger = require('../../lib/logger/logger').init();


var changePassword = function(options, callback) {
  userEntities.findUserByEmail(options.email, function(err, user) {
    if(!err) {
      if(user) {
        if(passwordHash.verify(options.oldPassword, user.password)) {
          var newPasswordHash = passwordHash.generate(options.newPassword);
          userEntities.setNewPasswordForEmail(options.email, newPasswordHash, function(err, result) {
            if (!err && result) {
              logger.debug("Password changed.");
              callback(null, httpStatuses.Users.PasswordChanged, result);
            } else {
              logger.error("Internal Server Error: " + JSON.stringify(err));
              callback(httpStatuses.Generic.InternalServerError, null);
            }
          });
        } else {
          logger.debug("Cannot change password: Password incorrect.");
          callback(httpStatuses.Auth.Unauthorized, null);
        }
      } else {
        logger.debug("Cannot change password for user: User " + options.email + " not exists.");
        callback(httpStatuses.Users.NotExists, null);
      }
    } else {
      logger.error("Internal Server Error: " + JSON.stringify(err));
      callback(httpStatuses.Generic.InternalServerError, null)
    }
  });
};

var removeUserSecretData = function(user) {
  delete user.password;
  delete user.activated;
  delete user._id;
  return user;
};

var getUserInformations = function(username, callback) {
  userEntities.findUserByUsername(username, function(err, user) {
    if(!err) {
      if(user) {
        logger.info("User " + username + " informations sent.");
        callback(null, removeUserSecretData(user));
      } else {
        logger.debug("Cannot get user informations: User " + username + " not exists.");
        callback(httpStatuses.Users.NotExists, null);
      }
    } else {
      logger.error("Internal Server Error: " + JSON.stringify(err));
      callback(httpStatuses.Generic.InternalServerError, null)
    }
  })
};

var updateUserInformations = function(username, userAttributes, callback) {
  userEntities.findUserByUsername(username, function(err, user) {
    if(!err) {
      if(user) {
        userEntities.updateByUsername(username, userAttributes, function(err, result) {
          if(!err && result){
            logger.info("User " + username + " updated.");
            callback(null, httpStatuses.Users.Updated);
          } else{
            logger.error("Internal Server Error: " + JSON.stringify(err));
            callback(httpStatuses.Generic.InternalServerError, null);
          }
        });
      } else {
        logger.debug("Cannot update user informations: User " + username + " not exists.");
        callback(httpStatuses.Users.NotExists, null);
      }
    } else {
      logger.error("Internal Server Error: " + JSON.stringify(err));
      callback(httpStatuses.Generic.InternalServerError, null);
    }
  })
};

module.exports = {
  changePassword: changePassword,
  getUserInformations: getUserInformations,
  updateUserInformations: updateUserInformations
};
