'use strict';

angular.module('sharpWarsWebServiceApp')
  .controller('userCtrl', function ($scope, $location, $window, errorInterpreter, loginService, $interval) {

    $scope.$watch(function() {
      return $window.sessionStorage.token;
    }, function() {
      if($window.sessionStorage.token) {
        $scope.userLoggedIn = true;
      } else {
        $scope.userLoggedIn = false;
      }
    });

    $scope.logMeIn = function(login, password) {
      loginService.logIn(login, password, function(err, result) {
        if(!err && result) {
          $window.sessionStorage.token = result.token;
          $scope.errors = null;
        } else {
          $scope.errors = errorInterpreter.interpreter(err);
        }
      });
    };

    $scope.logOut = function() {
      if($window.sessionStorage.token) {
        delete $window.sessionStorage.token;
        $location.path('/');
      }
    };

    $scope.registerRedirection = function() {
      $location.path('/register');
    };

    $scope.passwordRestoreRedirection = function() {
      $location.path('/passwordRecovery');
    };

    $scope.afterActivation = function() {
      $scope.activationTimer = $interval(callAtIntervalAfterActivation, 5000);
    };

    function callAtIntervalAfterActivation() {
      $location.path('/home');
      $interval.cancel($scope.activationTimer);
    }

  });
