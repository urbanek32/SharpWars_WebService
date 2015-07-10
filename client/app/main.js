'use strict';

angular.module('sharpWarsWebServiceApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/views/home.html',
        controller: 'MainCtrl'
      }).when('/profile', {
        templateUrl: 'app/views/profile.html',
        //controller: 'MainCtrl'
      });
  });
