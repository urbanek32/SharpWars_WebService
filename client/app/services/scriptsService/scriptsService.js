'use strict';

angular.module('sharpWarsWebServiceApp')
  .service('scriptsService', function ($http) {

    this.addScript = function(username, script, callback) {
      var body = {
        name: script.name,
        description: script.description,
        code: script.code
      };
      $http.post('/auth/api/users/' + username + '/scripts/add', body)
        .success(function(data) {
          callback(null, data);
        })
        .error(function(err) {
          callback(err, null);
        });
    };

    this.getScriptsList = function (username, callback) {
      $http.get('/auth/api/users/' + username + '/scripts/list')
        .success(function(data) {
          callback(null, data);
        })
        .error(function(err) {
          callback(err, null);
        });
    };

    this.deleteScript = function (username, scriptName, callback) {
      $http.delete('/auth/api/users/' + username + '/scripts/' + scriptName)
        .success(function(data) {
          callback(null, data);
        })
        .error(function(err) {
          callback(err, null);
        });
    };

    this.getOneScript = function (username, scriptName, callback) {
      $http.get('/auth/api/users/' + username + '/scripts/' + scriptName)
        .success(function(data) {
          callback(null, data);
        })
        .error(function(err) {
          callback(err, null);
        });
    };

    this.editScript = function (username, oldScriptName, script, callback) {
      var body = {
        name: script.name,
        description: script.description,
        code: script.code
      };
      $http.post('/auth/api/users/' + username + '/scripts/update/' + oldScriptName, body)
        .success(function(data) {
          callback(null, data);
        })
        .error(function(err) {
          callback(err, null);
        });
    };
  });

