'use strict';

angular.module('sharpWarsWebServiceApp')
  .service('lobbyService', function ($http) {

    this.creteLobby = function(username, lobby, callback) {
      $http.post('/auth/api/users/' + username + '/lobby/add', lobby)
        .success(function(data) {
          callback(null, data);
        })
        .error(function(err) {
          callback(err, null);
        });
    };

  });
