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
    this.register = function(login, password, name, surname, email, callback) {
      var body = {
        username: login,
        password: password,
        name: name,
        surname: surname,
        email: email
      };
      $http.post('/api/users/add', body)
        .error(function (err) {
          callback(err, null);
        });
    };
  });
