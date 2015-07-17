'use strict';

angular.module('sharpWarsWebServiceApp')
  .controller('userCtrl', function ($scope,$interval,$location) {

    $scope.afterActivation = function() {
      $scope.activationTimer=$interval(callAtIntervalAfterActivation, 5000);
    };

    function callAtIntervalAfterActivation() {
      $location.path('/home');
      $interval.cancel($scope.activationTimer);
    }

  });
