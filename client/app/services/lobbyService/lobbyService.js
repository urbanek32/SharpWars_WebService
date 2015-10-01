'use strict';

angular.module('sharpWarsWebServiceApp')
  .service('lobbyService', function ($http) {

    this.createLobby = function(username, ip, lobby, callback) {
      var body = {
        lobby: lobby,
        masterPublicIP: ip
      };
      $http.post('/auth/api/users/' + username + '/lobby/add', body)
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

    this.joinUserToLobby = function (username, lobbyName, ip, password, callback){
      var body = {
        password: password,
        publicIP: ip
      };
      $http.post('/auth/api/users/' + username + '/lobby/join/' + lobbyName, body)
        .success(function(data) {
          callback(null, data);
        })
        .error(function(err) {
          callback(err, null);
        });
    };

    this.getActiveLobbyForUser = function (username, callback) {
      $http.get('/auth/api/users/' + username + '/lobby/active')
        .success(function(data) {
          callback(null, data);
        })
        .error(function(err) {
          callback(err, null);
        });
    };

    this.leaveLobby = function (username, lobbyName, callback) {
      $http.post('/auth/api/users/' + username + '/lobby/leave/' + lobbyName)
        .success(function(data) {
          callback(null, data);
        })
        .error(function(err) {
          callback(err, null);
        });
    };

    this.deleteLobby = function (username, lobbyName, callback) {
      $http.delete('/auth/api/users/' + username + '/lobby/delete/' + lobbyName)
        .success(function(data) {
          callback(null, data);
        })
        .error(function(err) {
          callback(err, null);
        });
    };

    this.startLobby = function(username, lobbyName, callback) {
      $http.post('/auth/api/users/' + username + '/lobby/start/' + lobbyName)
        .success(function(data) {
          callback(null, data);
        })
        .error(function(err) {
          callback(err, null);
        });
    };

    this.changePlayerStatus = function(username, lobbyName, callback) {
      $http.post('/auth/api/users/' + username + '/lobby/' + lobbyName + '/status')
        .success(function(data) {
          callback(null, data);
        })
        .error(function(err) {
          callback(err, null);
        });
    };

  });

