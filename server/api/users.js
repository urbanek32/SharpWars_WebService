'use strict';

var userEntities = require('../entities/users-entities'),
  httpStatuses = require('../components/httpStatuses').httpStatuses,
  passwordHash = require('password-hash');


var addUser = function(newUser, callback) {
  userEntities.findUserByEmail(newUser.email, function(err, user){
    if(!err) {
      if(!user) {
        userEntities.findUserByUsername(newUser.username, function(err, user) {
          if(!err) {
            if(!user) {
              newUser.password = passwordHash.generate(newUser.password);
              userEntities.addUser(newUser, function(err, result) {
                callback(err, result);
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

module.exports = {
  addUser: addUser
};
