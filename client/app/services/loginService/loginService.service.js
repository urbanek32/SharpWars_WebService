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
  });
