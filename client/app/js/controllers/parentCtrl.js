'use strict';

angular.module('sharpWarsWebServiceApp')
  .controller('ParentCtrl', function ($scope, $window, utilsService) {
    $scope.user = {
      scoreCriteria: 'victories',
      scoreSorting: 'asc',
      scoreLimit: 10,
      name: $window.sessionStorage.sessionUsername || 'Guest'
    };

    utilsService.readJsonFile('/assets/locale/server/responses.json', function(json) {
      $scope.serverResponsesTemplates = json;
    });

    $scope.showErrorBanner = false;
    $scope.errors = null;

    $scope.setMessage = function(isError, errors) {
      $scope.showBanner = true;
      $scope.isError = isError;
      $scope.errors = errors;
    };

    $scope.hideBanner = function() {
      $scope.errors = null;
      $scope.showBanner = false;
    };

  });
