'use strict';

angular.module('sharpWarsWebServiceApp')
  .controller('scoresCtrl', function ($scope, $routeParams, $location, $window, responseInterpreter,
                                    scoreService, $interval, $translate) {

    $scope.getGameScoresForUser = function() {
      scoreService.getGameScoresForUser($scope.user.name, function(err, result) {
        if(!err && result) {
          $scope.playerScores = result;
        } else {
          $scope.$parent.setMessage(true, responseInterpreter.responseBuilder(err, $scope.$parent.serverResponsesTemplates, $translate));
        }
      });
    };

    $scope.getTopScores = function() {
      scoreService.getTopScoresForUser($scope.user.name, $scope.user.scoreCriteria, $scope.user.scoreSorting,
        $scope.user.scoreLimit, function(err, result) {
        if(!err && result) {
          $scope.playerTopScores = result;
        } else {
          $scope.$parent.setMessage(true, responseInterpreter.responseBuilder(err, $scope.$parent.serverResponsesTemplates, $translate));
        }
      });
    };

    $scope.setScoreParams = function(newCriteria, newSorting) {
      $scope.user.scoreCriteria = newCriteria;
      $scope.user.scoreSorting = newSorting;
      $scope.getTopScores();
    };

    $scope.showMore = function() {
      $scope.user.scoreLimit += 10;
      $scope.getTopScores();
    };

  });
