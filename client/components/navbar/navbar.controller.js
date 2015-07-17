'use strict';

angular.module('sharpWarsWebServiceApp')
  .controller('NavbarCtrl', function ($scope, $location) {
    $scope.menu = [{
      'title': 'Home',
      'link': '/'
    },{
      'title': 'Moje konto',
      'link': '/profile'
    },{
      'title': 'Pobierz grę',
      'link': '/download'
    }];

    $scope.isCollapsed = true;

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });
