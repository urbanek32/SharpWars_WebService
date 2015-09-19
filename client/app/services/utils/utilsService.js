'use strict';

angular.module('sharpWarsWebServiceApp')
  .service('utilsService', function ($http) {
    this.readJsonFile = function(path, callback) {
      $http.get(path).then(function(data) {
        callback(data.data);
      });
    };
  });
