'use strict';

angular.module('sharpWarsWebServiceApp')
  .controller('scriptsCtrl', function ($scope, $routeParams, $location, $window, scriptsService,
                                       responseInterpreter, $translate) {

    $scope.saveScript = function() {
      $scope.serverResponse = null;
      $scope.errors = null;
      if($scope.editMode === true) {
        scriptsService.editScript($scope.user.name, $routeParams.scriptName, $scope.script, function (err, result) {
          if (!err && result) {
            $scope.editResult = responseInterpreter.responseBuilder(result, $scope.$parent.serverResponsesTemplates, $translate);
          } else {
            $scope.errors = responseInterpreter.responseBuilder(err, $scope.$parent.serverResponsesTemplates, $translate);
          }
        });
      } else {
        scriptsService.addScript($scope.user.name, $scope.script, function (err, result) {
          if (!err && result) {
            $scope.serverResponse = responseInterpreter.responseBuilder(result, $scope.$parent.serverResponsesTemplates, $translate);
            $scope.script.name = '';
            $scope.script.description = '';
            $scope.script.code = '';
          } else {
            $scope.errors = responseInterpreter.responseBuilder(err, $scope.$parent.serverResponsesTemplates, $translate);
          }
        });
      }
    };

    $scope.getScriptsList = function() {
      $scope.serverResponse = null;
      $scope.errors = null;
      scriptsService.getScriptsList($scope.user.name, function(err, result) {
        if(!err && result) {
          $scope.scriptLists = result;
        } else {
          $scope.errors = responseInterpreter.responseBuilder(err, $scope.$parent.serverResponsesTemplates, $translate);
        }
      });
    };

    $scope.deleteScript = function(scriptName) {
      $scope.serverResponse = null;
      $scope.errors = null;
      scriptsService.deleteScript($scope.user.name, scriptName, function(err, result) {
        if(!err && result) {
          $scope.serverResponse = responseInterpreter.responseBuilder(result, $scope.$parent.serverResponsesTemplates, $translate);
        } else {
          $scope.errors = responseInterpreter.responseBuilder(err, $scope.$parent.serverResponsesTemplates, $translate);
        }
      });
      $scope.getScriptsList();
    };

    $scope.editScript = function(scriptInfo) {
      $location.path('/scriptsSpec/' + scriptInfo.name);
    };

    $scope.editModeInit = function() {
      $scope.editMode = null;
      $scope.editResult = null;
      if ($routeParams.scriptName) {
        $scope.editMode = true;
        scriptsService.getOneScript($scope.user.name, $routeParams.scriptName , function(err, result) {
          if(!err && result) {
            $scope.script = result;
          } else {
            $scope.errors = responseInterpreter.responseBuilder(err, $scope.$parent.serverResponsesTemplates, $translate);
          }
        });
      }
    };
  });
