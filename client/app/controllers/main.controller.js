'use strict';

angular.module('sharpWarsWebServiceApp')
  .controller('MainCtrl', function ($scope, testService) {
    $scope.awesomeThings = [];
    testService.getTestA(function(err, result) {
      if(!err && result && result.data) {
        $scope.awesomeThings = result.data;
      } else {
        $scope.awesomeThings = [];
      }
    });
  });
