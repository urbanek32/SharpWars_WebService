'use strict';

angular.module('sharpWarsWebServiceApp')
  .controller('NavbarCtrl', function ($scope, $location) {
    $scope.isCollapsed = true;

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });
