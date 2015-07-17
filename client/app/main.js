'use strict';

angular.module('sharpWarsWebServiceApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/views/home.html',
        controller: 'MainCtrl'
      }).when('/profile', {
        templateUrl: 'app/views/profile.html',
        controller: 'userCtrl'
      }).when('/register', {
        templateUrl: 'app/views/register.html',
        controller: 'userCtrl'
      }).when('/passwordRecovery', {
        templateUrl: 'app/views/passwordRecovery.html',
        controller: 'userCtrl'
      }).when('/download', {
        templateUrl: 'app/views/download.html'
      });
  });
