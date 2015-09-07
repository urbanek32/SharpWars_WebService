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

    this.getScriptsList = function (username, callback){
      $http.get('/auth/api/users/' + username + '/scripts/list')
        .success(function(data) {
          callback(null, data);
        })
        .error(function(err) {
          callback(err, null);
        });
    };

  });

