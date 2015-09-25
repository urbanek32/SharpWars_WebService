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
        } else {
          $scope.$parent.setMessage(true, responseInterpreter.responseBuilder(err, $scope.$parent.serverResponsesTemplates, $translate));
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
      loginService.register(newUser, function(err, result) {
        if(!err && result) {
          $scope.$parent.setMessage(false, responseInterpreter.responseBuilder(result, $scope.$parent.serverResponsesTemplates, $translate));
          $location.path('/');
        } else {
          $scope.$parent.setMessage(true, responseInterpreter.responseBuilder(err, $scope.$parent.serverResponsesTemplates, $translate));
        }
      });
    };

    $scope.getUserInfo = function(username) {
      loginService.getUserInfo(username, function(err, userData) {
        if(!err) {
          $scope.user = userData;
        } else {
          $scope.$parent.setMessage(true, responseInterpreter.responseBuilder(err, $scope.$parent.serverResponsesTemplates, $translate));
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
          $scope.$parent.setMessage(false, responseInterpreter.responseBuilder(result, $scope.$parent.serverResponsesTemplates, $translate));
        } else {
          $scope.$parent.setMessage(true, responseInterpreter.responseBuilder(err, $scope.$parent.serverResponsesTemplates, $translate));
        }
      });
    };

    $scope.changePassword = function() {
      loginService.saveUserPassword($scope.user, function(err, result) {
        if(!err && result) {
          $scope.isShownPasswordForm = false;
          $scope.$parent.setMessage(false, responseInterpreter.responseBuilder(result, $scope.$parent.serverResponsesTemplates, $translate));
        } else {
          $scope.$parent.setMessage(true, responseInterpreter.responseBuilder(err, $scope.$parent.serverResponsesTemplates, $translate));
        }
      });
    };

    $scope.resetPasswordByEmail = function() {
      loginService.forgotPassword($scope.passwordReset, function(err, result) {
        if(!err && result) {
          $scope.$parent.setMessage(false, responseInterpreter.responseBuilder(result, $scope.$parent.serverResponsesTemplates, $translate));
        } else {
          $scope.$parent.setMessage(true, responseInterpreter.responseBuilder(err, $scope.$parent.serverResponsesTemplates, $translate));
        }
      });
    };

    $scope.resetPasswordForUser = function() {
      loginService.resetPasswordRequest($scope.passwordReset, $routeParams.username, $routeParams.token, function(err, result) {
        if(!err && result) {
          $scope.$parent.setMessage(false, responseInterpreter.responseBuilder(result, $scope.$parent.serverResponsesTemplates, $translate));
          $scope.activationTimer = $interval(callAtIntervalAfterActivation, 5000);
        } else {
          $scope.$parent.setMessage(true, responseInterpreter.responseBuilder(err, $scope.$parent.serverResponsesTemplates, $translate));
        }
      });
    };
  });
