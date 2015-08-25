'use strict';

angular.module('sharpWarsWebServiceApp')
  .controller('lobbyCtrl', function ($scope, $window, lobbyService, errorInterpreter) {

    $scope.lobbyRequired = null;

    $scope.createLobby = function() {
      $scope.errors = null;
      $scope.serverResponse = null;
      if (!$scope.lobby.encrypted) {
        $scope.lobby.encrypted = false;
      }
      lobbyService.creteLobby($scope.user.name, $scope.lobby, function(err, result) {
        if(!err && result) {
          $scope.serverResponse = result[0].message;
        } else {
          $scope.errors = errorInterpreter.interpreter(err);
        }
      });
    };

    $scope.getLobbyList = function() {
      lobbyService.getLobbyList($scope.user.name, function(err, result) {
        if(!err && result) {
          $scope.lobbyLists = result;
        } else {
          $scope.errors = errorInterpreter.interpreter(err);
        }
      });
    };

    $scope.lobbyRequest = function(lobby, pass) {
      if(pass === true){
        $scope.lobbyRequired = lobby;
      } else {
        $scope.lobbyJoin(lobby, null);
      }
      $scope.errors = null;
      $scope.serverResponse = null;
    };

    $scope.lobbyJoin = function(lobby, pass) {
      if(pass !== null)
      {
        var lobbyData = {
          password: pass
        };
      } else {
        var lobbyData = {
          password: null
        };
      }
      lobbyService.joinUserToLobby($scope.user.name, lobby, lobbyData, function(err, result) {
        if(!err && result) {
          $scope.serverResponse = result[0].message;
        } else {
          $scope.errors = errorInterpreter.interpreter(err);
        }
      });
      $scope.lobbyRequired = null;
    };

  });


