'use strict';

angular.module('sharpWarsWebServiceApp')
  .controller('scriptsCtrl', function ($scope, $routeParams, $location, $window, scriptsService,
                                       responseInterpreter, $translate) {

    $scope.saveScript = function() {
      if($scope.editMode === true) {
        scriptsService.editScript($scope.user.name, $routeParams.scriptName, $scope.script, function (err, result) {
          if (!err && result) {
            $scope.$parent.setMessage(false, responseInterpreter.responseBuilder(result, $scope.$parent.serverResponsesTemplates, $translate));
            $location.path('/scripts');
          } else {
            $scope.$parent.setMessage(true, responseInterpreter.responseBuilder(err, $scope.$parent.serverResponsesTemplates, $translate));
          }
        });
      } else {
        scriptsService.addScript($scope.user.name, $scope.script, function (err, result) {
          if (!err && result) {
            $scope.$parent.setMessage(false, responseInterpreter.responseBuilder(result, $scope.$parent.serverResponsesTemplates, $translate));
            $scope.script.name = '';
            $scope.script.description = '';
            $scope.script.code = '';
            $location.path('/scripts');
          } else {
            $scope.$parent.setMessage(true, responseInterpreter.responseBuilder(err, $scope.$parent.serverResponsesTemplates, $translate));
          }
        });
      }
    };

    $scope.getScriptsList = function() {
      scriptsService.getScriptsList($scope.user.name, function(err, result) {
        if(!err && result) {
          $scope.scriptLists = result;
        } else {
          $scope.$parent.setMessage(true, responseInterpreter.responseBuilder(err, $scope.$parent.serverResponsesTemplates, $translate));
        }
      });
    };

    $scope.deleteScript = function(scriptName) {
      scriptsService.deleteScript($scope.user.name, scriptName, function(err, result) {
        if(!err && result) {
          $scope.$parent.setMessage(false, responseInterpreter.responseBuilder(result, $scope.$parent.serverResponsesTemplates, $translate));
        } else {
          $scope.$parent.setMessage(true, responseInterpreter.responseBuilder(err, $scope.$parent.serverResponsesTemplates, $translate));
        }
      });
      $scope.getScriptsList();
    };

    $scope.editScript = function(scriptInfo) {
      $location.path('/scriptsDetails/' + scriptInfo.name);
    };

    $scope.editModeInit = function() {
      $scope.editMode = null;
      if ($routeParams.scriptName) {
        $scope.editMode = true;
        scriptsService.getOneScript($scope.user.name, $routeParams.scriptName , function(err, result) {
          if(!err && result) {
            $scope.script = result;
          } else {
            $scope.$parent.setMessage(true, responseInterpreter.responseBuilder(err, $scope.$parent.serverResponsesTemplates, $translate));
          }
        });
      }
    };
  });
