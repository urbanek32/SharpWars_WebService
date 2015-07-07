'use strict';

angular.module('sharpWarsWebServiceApp')
  .service('testService', function ($http) {
    this.getTestA = function(callback) {
      $http.get('/api/tests/test_a').then(function(data) {
        callback(null, data);
      }, function(error) {
        callback(error, null);
      });
    };
  });
