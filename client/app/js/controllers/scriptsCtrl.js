'use strict';

angular.module('sharpWarsWebServiceApp')
  .controller('scriptsCtrl', function ($scope, $window, scriptsService, errorInterpreter) {

    $scope.saveScript = function() {
      $scope.serverResponse = null;
      $scope.errors = null;
      scriptsService.addScript($scope.user.name, $scope.script, function (err, result) {
        if (!err && result) {
          $scope.serverResponse = result[0].message;
          $scope.script.name = '';
          $scope.script.description = '';
          $scope.script.code = '';
        } else {
          $scope.errors = errorInterpreter.interpreter(err);
        }
      });
    };
  });
