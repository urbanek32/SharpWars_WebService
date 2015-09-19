'use strict';

angular.module('sharpWarsWebServiceApp')
  .controller('lobbyCtrl', function ($scope, $window, lobbyService, responseInterpreter, $interval, $translate) {

    $scope.createLobby = function() {
      $scope.errors = null;
      $scope.serverResponse = null;
      if (!$scope.lobby.encrypted) {
        $scope.lobby.encrypted = false;
      }
      lobbyService.creteLobby($scope.user.name, $scope.lobby, function(err, result) {
        if(!err && result) {
          $scope.serverResponse = responseInterpreter.responseBuilder(result, $scope.$parent.serverResponsesTemplates, $translate);
        } else {
          $scope.errors = responseInterpreter.responseBuilder(err, $scope.$parent.serverResponsesTemplates, $translate);
        }
      });
    };

    $scope.getLobbyList = function() {
      lobbyService.getLobbyList($scope.user.name, function(err, result) {
        if(!err && result) {
          $scope.lobbyLists = result;
        } else {
          $scope.errors = responseInterpreter.responseBuilder(err, $scope.$parent.serverResponsesTemplates, $translate);
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
            $scope.serverResponse = responseInterpreter.responseBuilder(result, $scope.$parent.serverResponsesTemplates, $translate);
            $scope.getActiveLobby();
            $scope.getLobbyList();
          } else {
            $scope.errors = responseInterpreter.responseBuilder(err, $scope.$parent.serverResponsesTemplates, $translate);
          }
        });
      }
    };

    $scope.getActiveLobby = function() {
      lobbyService.getActiveLobbyForUser($scope.user.name, function(err, result) {
        if(!err && result) {
          $scope.activeLobby = result[0];
        } else {
          $scope.errors = responseInterpreter.responseBuilder(err, $scope.$parent.serverResponsesTemplates, $translate);
        }
      });
    };

    $scope.getActiveLobby();
    $interval($scope.getActiveLobby, 3000);

    $scope.leaveLobby = function(lobbyName) {
      lobbyService.leaveLobby($scope.user.name, lobbyName, function (err, result) {
        if (!err && result) {
          $scope.activeLobby = null;
          $scope.serverResponse = responseInterpreter.responseBuilder(result, $scope.$parent.serverResponsesTemplates, $translate);
          $scope.getLobbyList();
        } else {
          $scope.errors = responseInterpreter.responseBuilder(err, $scope.$parent.serverResponsesTemplates, $translate);
        }
      });
    };

    $scope.deleteLobby = function(lobbyName) {
      lobbyService.deleteLobby($scope.user.name, lobbyName, function (err, result) {
        if (!err && result) {
          $scope.activeLobby = null;
          $scope.serverResponse = responseInterpreter.responseBuilder(result, $scope.$parent.serverResponsesTemplates, $translate);
          $scope.getLobbyList();
        } else {
          $scope.errors = responseInterpreter.responseBuilder(err, $scope.$parent.serverResponsesTemplates, $translate);
        }
      });
    };

    $scope.startLobby = function(lobbyName) {
      lobbyService.startLobby($scope.user.name, lobbyName, function(err, result) {
        if (!err && result) {
          $scope.serverResponse = responseInterpreter.responseBuilder(result, $scope.$parent.serverResponsesTemplates, $translate);
          $scope.getActiveLobby();
          $scope.getLobbyList();
        } else {
          $scope.errors = responseInterpreter.responseBuilder(err, $scope.$parent.serverResponsesTemplates, $translate);
        }
      });
    };

    $scope.changeMyStatus = function(lobbyName) {
      lobbyService.changePlayerStatus($scope.user.name, lobbyName, function(err, result) {
        if (!err && result) {
          $scope.serverResponse = responseInterpreter.responseBuilder(result, $scope.$parent.serverResponsesTemplates, $translate);
          $scope.getActiveLobby();
          $scope.getLobbyList();
        } else {
          $scope.errors = responseInterpreter.responseBuilder(err, $scope.$parent.serverResponsesTemplates, $translate);
        }
      });
    };


    $scope.gameStarted = false;
    $scope.$watch('activeLobby', function() {
      if($scope.activeLobby.state === 'play') {
        if(!$scope.gameStarted) {
          $scope.gameStarted = true;
          $window.alert('No to startuj grę');
        }
      } else {
        $scope.gameStarted = false;
      }
    });

});


