'use strict';

angular.module('sharpWarsWebServiceApp')
  .controller('NavbarCtrl', function ($scope, $location, $translate) {
    $scope.menu = [{
      'title': $translate.instant('SUBPAGE_HOME'),
      'link': '/'
    },{
      'title': $translate.instant('SUBPAGE_PROFILE'),
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
