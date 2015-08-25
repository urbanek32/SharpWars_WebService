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

    this.getLobbyList = function (username, callback){
      $http.get('/auth/api/users/' + username + '/lobby/list')
        .success(function(data) {
          callback(null, data);
        })
        .error(function(err) {
          callback(err, null);
        });
    };

    this.joinUserToLobby = function (username, lobbyName, password, callback){
      var body = {
        password: password
      };
      $http.put('/auth/api/users/' + username + '/lobby/join/' + lobbyName, body)
        .success(function(data) {
          callback(null, data);
        })
        .error(function(err) {
          callback(err, null);
        });
    };

  });

