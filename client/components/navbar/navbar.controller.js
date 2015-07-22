'use strict';

angular.module('sharpWarsWebServiceApp')
  .controller('NavbarCtrl', function ($scope, $location, $window) {
    $scope.isCollapsed = true;

    $scope.$watch(function() {
      return $window.sessionStorage.token;
    }, function() {
      if($window.sessionStorage.token) {
        $scope.userLoggedIn = true;
      } else {
        $scope.userLoggedIn = false;
      }
    });

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });
