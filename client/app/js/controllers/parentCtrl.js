'use strict';

angular.module('sharpWarsWebServiceApp')
  .controller('ParentCtrl', function ($scope, $window) {
    $scope.user = {
      name: $window.sessionStorage.sessionUsername || 'Guest'
    };
  });
