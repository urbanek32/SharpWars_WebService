'use strict';

angular.module('sharpWarsWebServiceApp')
  .controller('ParentCtrl', function ($scope, $window, utilsService) {
    $scope.user = {
      name: $window.sessionStorage.sessionUsername || 'Guest'
    };

    utilsService.readJsonFile('/assets/locale/server/responses.json', function(json) {
      $scope.serverResponsesTemplates = json;
    });
  });
