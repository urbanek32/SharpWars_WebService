'use strict';

angular.module('sharpWarsWebServiceApp')
  .service('loginService', function ($http) {
    this.logIn = function(login, password, callback) {
      var body = {
        username: login,
        password: password
      };
      $http.post('/api/users/login', body)
        .success(function(data) {
            callback(null, data);
        })
        .error(function(err) {
          callback(err, null);
        });
    };

    this.register = function(newUser, callback) {
      $http.post('/api/users/add', newUser)
        .success(function(data) {
            callback(null, data);
          })
        .error(function(err) {
            callback(err, null);
          });
      };

    this.getUserInfo = function(username, callback) {
      $http.get('/auth/api/users/' + username + '/profile')
        .success(function(data) {
          callback(null, data);
        })
        .error(function(err) {
          callback(err, null);
        });
    };

    this.updateUserData = function(username, userData, callback) {
      var body = {
        location: userData.location || '',
        hobby: userData.hobby || '',
        email: userData.email
      };
      $http.put('/auth/api/users/' + username + '/profile', body)
        .success(function(data) {
          callback(null, data);
        })
        .error(function(err) {
          callback(err, null);
        });
    };
  });
