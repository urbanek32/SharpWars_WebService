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
          $window.sessionStorage.sessionUsername = login;
          $scope.$parent.user.name = login;
          $scope.user = null;
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

    $scope.registerUserForm = function(newUser) {
      $scope.errors = null;
      $scope.registrationSuccess = false;
      loginService.register(newUser, function(err, result) {
        if(!err && result) {
          $scope.registrationSuccess = true;
          $scope.registrationServerResponse = result[0].message;
        } else {
          $scope.errors = errorInterpreter.interpreter(err);
        }
      });
    };

    $scope.getUserInfo = function(username) {
      loginService.getUserInfo(username, function(err, userData) {
        if(!err) {
          $scope.user = userData;
        } else {
          $scope.errors = errorInterpreter.interpreter(err);
        }
      });
    };

    $scope.editMode = false;
    $scope.editUserData = function() {
      $scope.editMode = !$scope.editMode;
    };

    $scope.isShownPasswordForm = false;
    $scope.showPasswordForm = function() {
      $scope.isShownPasswordForm = !$scope.isShownPasswordForm;
    };

    $scope.saveEditedUserData = function() {
      loginService.updateUserData($scope.user.username, $scope.user, function(err, result){
        if(!err && result) {
          $scope.editMode = false;
        } else {
          $scope.errors = errorInterpreter.interpreter(err);
        }
      });
    };

    $scope.changePassword = function() {
      loginService.saveUserPassword($scope.user, function(err, result){
        if(!err && result) {
          $scope.isShownPasswordForm = false;
          $scope.serverResponse = result[0].message;
        } else {
          $scope.errors = errorInterpreter.interpreter(err);
        }
      });
    };

  });
