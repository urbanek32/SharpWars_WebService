'use strict';

angular.module('sharpWarsWebServiceApp')
  .directive('bottom', function() {
    return {
      restrict: 'E',
      transclude: true,
      templateUrl: 'app/directives/bottom.html'
    };
  });
