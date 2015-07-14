'use strict';

var userEntities = require('../entities/users-entities'),
  httpStatuses = require('../components/httpStatuses').httpStatuses,
  passwordHash = require('password-hash'),
  mailer = require('../lib/mailer/mailer'),
  config = require('../config/customConfig');


var sendActivationEmail = function(newUser, callback) {
  var mailOptions = {
    from: 'jiraya@daruhq.tk',
    to: newUser.email,
    subject: '[WebService] Activation account',
    text: config.webservice.host + ':' +config.webservice.port + '/api/users/' + newUser.username + '/activate/' + newUser.password
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
                  sendActivationEmail(newUser, function(err, result){
                    if(!err) {
                      callback(null, httpStatuses.Users.Created);
                    } else {
                      userEntities.deleteUserByEmail(newUser.email, function(err, result){
                        if(err && !result) {
                          callback(err, null);
                        }
                      });
                      callback(httpStatuses.Generic.InternalServerError, null);
                    }
                  })
                }
              });
            } else {
              callback(httpStatuses.Users.UserAlreadyExists, null);
            }
          } else {
            callback(err, null);
          }
        })
      } else {
        callback(httpStatuses.Users.UserAlreadyExists, null);
      }
    } else {
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
                callback(null, httpStatuses.Users.Activated, result);
              } else {
                callback(httpStatuses.Generic.InternalServerError, null);
              }
            });
          } else {
            callback(httpStatuses.Auth.Unauthorized, null);
          }
        } else {
          callback(httpStatuses.Users.UserAlreadyActivated, null);
        }
      } else {
        callback(httpStatuses.Users.UserNotExists, null);
      }
    } else {
      callback(httpStatuses.Generic.InternalServerError, null)
    }
  })
};

module.exports = {
  addUser: addUser,
  activateUser: activateUser
};
