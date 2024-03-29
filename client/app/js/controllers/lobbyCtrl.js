'use strict';

angular.module('sharpWarsWebServiceApp')
  .controller('lobbyCtrl', function ($scope, $window, lobbyService, responseInterpreter, utilsService,
                                     $interval, $translate, $location) {

    $scope.createLobby = function() {
      if (!$scope.lobby.encrypted) {
        $scope.lobby.encrypted = false;
      }
      utilsService.getMyPublicIp(function(ip) {
        if (ip) {
          lobbyService.createLobby($scope.user.name, ip, $scope.lobby, function (err, result) {
            if (!err && result) {
              $scope.$parent.setMessage(false, responseInterpreter.responseBuilder(result, $scope.$parent.serverResponsesTemplates, $translate));
              $location.path('/lobbyList');
            } else {
              $scope.$parent.setMessage(true, responseInterpreter.responseBuilder(err, $scope.$parent.serverResponsesTemplates, $translate));
            }
          });
        }
      });
    };

    $scope.getLobbyList = function() {
      lobbyService.getLobbyList($scope.user.name, function(err, result) {
        if(!err && result) {
          $scope.lobbyLists = result;
        } else {
          $scope.$parent.setMessage(true, responseInterpreter.responseBuilder(err, $scope.$parent.serverResponsesTemplates, $translate));
        }
      });
    };

    $scope.showPasswordPopUp = [];
    for(var lobby in $scope.lobbyList) {
      $scope.showPasswordPopUp[lobby] = false;
    }

    $scope.joinToLobby = function(index, lobby, password) {
      if(lobby.encrypted && !password) {
        $scope.showPasswordPopUp[index] = true;
      } else {
        utilsService.getMyPublicIp(function(ip) {
          if(ip) {
            lobbyService.joinUserToLobby($scope.user.name, lobby.name, ip, password, function(err, result) {
              if(!err && result) {
                $scope.showPasswordPopUp[index] = false;
                $scope.$parent.setMessage(false, responseInterpreter.responseBuilder(result, $scope.$parent.serverResponsesTemplates, $translate));
                $scope.getActiveLobby();
                $scope.getLobbyList();
              } else {
                $scope.$parent.setMessage(true, responseInterpreter.responseBuilder(err, $scope.$parent.serverResponsesTemplates, $translate));
              }
            });
          }
        });
      }
    };

    $scope.getActiveLobby = function() {
      lobbyService.getActiveLobbyForUser($scope.user.name, function(err, result) {
        if(!err && result) {
          $scope.activeLobby = result[0];
        } else {
          $scope.$parent.setMessage(true, responseInterpreter.responseBuilder(err, $scope.$parent.serverResponsesTemplates, $translate));
        }
      });
    };

    $scope.getActiveLobby();
    var lobbyGetter = $interval($scope.getActiveLobby, 3000);

    $scope.$on('$destroy', function(){
      if (angular.isDefined(lobbyGetter)) {
        $interval.cancel(lobbyGetter);
        lobbyGetter = undefined;
      }
    });

    $scope.leaveLobby = function(lobbyName) {
      lobbyService.leaveLobby($scope.user.name, lobbyName, function (err, result) {
        if (!err && result) {
          $scope.activeLobby = null;
          $scope.$parent.setMessage(false, responseInterpreter.responseBuilder(result, $scope.$parent.serverResponsesTemplates, $translate));
          $scope.getLobbyList();
        } else {
          $scope.$parent.setMessage(true, responseInterpreter.responseBuilder(err, $scope.$parent.serverResponsesTemplates, $translate));
        }
      });
    };

    $scope.deleteLobby = function(lobbyName) {
      lobbyService.deleteLobby($scope.user.name, lobbyName, function (err, result) {
        if (!err && result) {
          $scope.activeLobby = null;
          $scope.$parent.setMessage(false, responseInterpreter.responseBuilder(result, $scope.$parent.serverResponsesTemplates, $translate));
          $scope.getLobbyList();
        } else {
          $scope.$parent.setMessage(true, responseInterpreter.responseBuilder(err, $scope.$parent.serverResponsesTemplates, $translate));
        }
      });
    };

    $scope.startLobby = function(lobbyName) {
      lobbyService.startLobby($scope.user.name, lobbyName, function(err, result) {
        if (!err && result) {
          $scope.$parent.setMessage(false, responseInterpreter.responseBuilder(result, $scope.$parent.serverResponsesTemplates, $translate));
          $scope.getActiveLobby();
          $scope.getLobbyList();
        } else {
          $scope.$parent.setMessage(true, responseInterpreter.responseBuilder(err, $scope.$parent.serverResponsesTemplates, $translate));
        }
      });
    };

    $scope.changeMyStatus = function(lobbyName) {
      lobbyService.changePlayerStatus($scope.user.name, lobbyName, function(err, result) {
        if (!err && result) {
          $scope.$parent.setMessage(false, responseInterpreter.responseBuilder(result, $scope.$parent.serverResponsesTemplates, $translate));
          $scope.getActiveLobby();
          $scope.getLobbyList();
        } else {
          $scope.$parent.setMessage(true, responseInterpreter.responseBuilder(err, $scope.$parent.serverResponsesTemplates, $translate));
        }
      });
    };

    var findMeInArray = function(players) {
      for(var i in players) {
        if(players[i].username === $scope.user.name) {
          return players[i];
        }
      }
    };

    var isMaster = function() {
      return +($scope.user.name === $scope.activeLobby.master);
    };

    var findMaster = function() {
      for(var i in $scope.activeLobby.players) {
        if($scope.activeLobby.players[i].username === $scope.activeLobby.master) {
          return $scope.activeLobby.players[i];
        }
      }
    };

    var runGameApp = function() {
      var masterPlayer = findMaster();
      return 'sharpwars://master=' + isMaster() +
        '&username=' + $scope.user.name +
        '&token=' + $window.sessionStorage.token +
        '&server_ip=' + masterPlayer.publicIP +
        '&server_port=' + $scope.activeLobby.serverPort;
    };

    $scope.gameStarted = false;
    $scope.$watch('activeLobby', function() {
      if($scope.activeLobby && $scope.activeLobby.state === 'play' && findMeInArray($scope.activeLobby.players).state !== 'finished') {
        if(!$scope.gameStarted) {
          $scope.gameStarted = true;
          window.location.href = runGameApp();
        }
      } else {
        $scope.gameStarted = false;
      }
    });

});


