'use strict';

angular.module('sharpWarsWebServiceApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/views/home.html',
        controller: 'MainCtrl'
      });
  });
