'use strict';

angular.module('sharpWarsWebServiceApp')
  .controller('LoginCtrl', function ($scope,$location) {

    $scope.userLogedIn=0;

    $scope.logMeIn = function($login,$password) {

      if ($login === 'lol' && $password === 'lol2')
      {
        $scope.userLogedIn = 1;
      }
    };

    $scope.registerRedirection = function() {
      $location.path('/register');
    };

    $scope.passwordRestoreRedirection = function() {
      $location.path('/passwordRecovery');
    };
  });
