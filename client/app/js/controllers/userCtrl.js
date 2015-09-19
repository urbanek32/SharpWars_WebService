'use strict';

angular.module('sharpWarsWebServiceApp')
  .controller('userCtrl', function ($scope, $routeParams, $location, $window, responseInterpreter,
                                    loginService, $interval, $translate) {

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
          $scope.errors = responseInterpreter.responseBuilder(err, $scope.$parent.serverResponsesTemplates, $translate);
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
          $scope.registrationServerResponse = responseInterpreter.responseBuilder(result, $scope.$parent.serverResponsesTemplates, $translate);
        } else {
          $scope.errors = responseInterpreter.responseBuilder(err, $scope.$parent.serverResponsesTemplates, $translate);
        }
      });
    };

    $scope.getUserInfo = function(username) {
      loginService.getUserInfo(username, function(err, userData) {
        if(!err) {
          $scope.user = userData;
        } else {
          $scope.errors = responseInterpreter.responseBuilder(err, $scope.$parent.serverResponsesTemplates, $translate);
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
          $scope.errors = responseInterpreter.responseBuilder(err, $scope.$parent.serverResponsesTemplates, $translate);
        }
      });
    };

    $scope.changePassword = function() {
      loginService.saveUserPassword($scope.user, function(err, result) {
        if(!err && result) {
          $scope.isShownPasswordForm = false;
          $scope.serverResponse = responseInterpreter.responseBuilder(result, $scope.$parent.serverResponsesTemplates, $translate);
        } else {
          $scope.errors = responseInterpreter.responseBuilder(err, $scope.$parent.serverResponsesTemplates, $translate);
        }
      });
    };

    $scope.resetPasswordByEmail = function() {
      $scope.errors = null;
      $scope.serverResponse = null;
      loginService.forgotPassword($scope.passwordReset, function(err, result) {
        if(!err && result) {
          $scope.serverResponse = responseInterpreter.responseBuilder(result, $scope.$parent.serverResponsesTemplates, $translate);
        } else {
          $scope.errors = responseInterpreter.responseBuilder(err, $scope.$parent.serverResponsesTemplates, $translate);
        }
      });
    };

    $scope.resetPasswordForUser = function() {
      $scope.errors = null;
      $scope.serverResponse = null;
      loginService.resetPasswordRequest($scope.passwordReset, $routeParams.username, $routeParams.token, function(err, result) {
        if(!err && result) {
          $scope.serverResponse = responseInterpreter.responseBuilder(result, $scope.$parent.serverResponsesTemplates, $translate);
          $scope.activationTimer = $interval(callAtIntervalAfterActivation, 5000);
        } else {
          $scope.errors = responseInterpreter.responseBuilder(err, $scope.$parent.serverResponsesTemplates, $translate);
        }
      });
    };
  });
