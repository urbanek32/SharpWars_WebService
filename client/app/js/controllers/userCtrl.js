'use strict';

angular.module('sharpWarsWebServiceApp')
  .controller('userCtrl', function ($scope, $location, $window, errorInterpreter, loginService, $interval) {
    $scope.userLogedIn = false;

    $scope.logMeIn = function(login, password) {
      loginService.logIn(login, password, function(err, result) {
        if(!err && result) {
          $window.sessionStorage.token = result.token;
          $scope.userLogedIn = true;
          $scope.errors = null;
        } else {
          $scope.errors = errorInterpreter.interpreter(err);
        }
      });
    };

    $scope.logOut = function() {
      if($window.sessionStorage.token) {
        delete $window.sessionStorage.token;
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

    $scope.registerUserForm = function($newUser) {
      window.alert($newUser);
    };

  });
