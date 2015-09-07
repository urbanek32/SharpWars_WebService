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

    $scope.getScriptsList = function() {
      $scope.serverResponse = null;
      $scope.errors = null;
      scriptsService.getScriptsList($scope.user.name, function(err, result) {
        if(!err && result) {
          $scope.scriptLists = result;
        } else {
          $scope.errors = errorInterpreter.interpreter(err);
        }
      });
    };

    $scope.deleteScript = function(scriptName) {
      $window.alert(scriptName); //placeholder
    };

    $scope.editScript = function(scriptName) {
      $window.alert(scriptName); //placeholder
    };
  });
