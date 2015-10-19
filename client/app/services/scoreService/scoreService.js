'use strict';

angular.module('sharpWarsWebServiceApp')
  .service('scoreService', function ($http) {

    this.getGameScoresForUser = function (username, callback) {
      $http.get('/auth/api/users/' + username + '/game/scores')
        .success(function(data) {
          callback(null, data);
        })
        .error(function(err) {
          callback(err, null);
        });
    };

    this.getTopScoresForUser = function (username, criteria, sorting, limit, callback) {
      $http.get('/auth/api/users/' + username + '/game/topscores/' + criteria + '/' + sorting + '/' + limit + '/')
        .success(function(data) {
          callback(null, data);
        })
        .error(function(err) {
          callback(err, null);
        });
    };

  });
