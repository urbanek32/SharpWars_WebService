'use strict';

angular.module('sharpWarsWebServiceApp')
  .controller('lobbyCtrl', function ($scope,$window) {

    $scope.lobbyCreateRequest = function(newLobby) {
      $window.alert(newLobby);
    };
  });
