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
  });


