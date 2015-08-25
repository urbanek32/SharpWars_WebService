'use strict';

angular.module('sharpWarsWebServiceApp')
  .controller('lobbyCtrl', function ($scope, $window, lobbyService, errorInterpreter) {

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

    $scope.showPasswordPopUp = [];
    for(var lobby in $scope.lobbyList) {
      $scope.showPasswordPopUp[lobby] = false;
    }

    $scope.joinToLobby = function(index, lobby, password) {
      $scope.errors = null;
      $scope.serverResponse = null;
      if(lobby.encrypted && !password) {
        $scope.showPasswordPopUp[index] = true;
      } else {
        lobbyService.joinUserToLobby($scope.user.name, lobby.name, password, function(err, result) {
          if(!err && result) {
            $scope.showPasswordPopUp[index] = false;
            $scope.serverResponse = result[0].message;
            $scope.getLobbyList();
          } else {
            $scope.errors = errorInterpreter.interpreter(err);
          }
        });
      }
    };

  $scope.deleteLobby = function(lobby) {
    console.log(lobby);
  };

});


