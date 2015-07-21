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
      }).when('/account_activation_success', {
        templateUrl: 'app/views/account_activation_success.html',
        controller: 'userCtrl'
      }).when('/account_activation_error', {
        templateUrl: 'app/views/account_activation_error.html',
        controller: 'userCtrl'
      }).when('/users/:email/reset_password/:password', {
        templateUrl: 'app/views/reset_password.html',
        controller: 'userCtrl'
      });
  });
