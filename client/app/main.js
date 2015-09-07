'use strict';

angular.module('sharpWarsWebServiceApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/views/home.html',
        controller: 'MainCtrl',
        authentication: false
      }).when('/profile', {
        templateUrl: 'app/views/profile.html',
        controller: 'userCtrl',
        authentication: true
      }).when('/register', {
        templateUrl: 'app/views/register.html',
        controller: 'userCtrl',
        authentication: false
      }).when('/passwordRecovery', {
        templateUrl: 'app/views/passwordRecovery.html',
        controller: 'userCtrl',
        authentication: false
      }).when('/download', {
        templateUrl: 'app/views/download.html',
        authentication: false
      }).when('/accountActivationSuccess', {
        templateUrl: 'app/views/accountActivationSuccess.html',
        controller: 'userCtrl',
        authentication: false
      }).when('/accountActivationError', {
        templateUrl: 'app/views/accountActivationError.html',
        controller: 'userCtrl',
        authentication: false
      }).when('/users/:mail/resetPassword/:hash', {
        templateUrl: 'app/views/resetPassword.html',
        controller: 'userCtrl',
        authentication: false
      }).when('/createLobby', {
        templateUrl: 'app/views/createLobby.html',
        controller: 'lobbyCtrl',
        authentication: true
      }).when('/lobbyList', {
        templateUrl: 'app/views/lobbyList.html',
        controller: 'lobbyCtrl',
        authentication: true
      }).when('/scripts', {
        templateUrl: 'app/views/scripts.html',
        controller: 'scriptsCtrl',
        authentication: true
      }).when('/scriptsSpec', {
        templateUrl: 'app/views/scriptsSpec.html',
        controller: 'scriptsCtrl',
        authentication: true
      }).when('/scriptsSpec/:scriptName', {
        templateUrl: 'app/views/scriptsSpec.html',
        controller: 'scriptsCtrl',
        authentication: true
      });
  })
  .run(function($rootScope, $window, $location) {
      $rootScope.$on('$routeChangeStart', function (e, newUrl) {
        if (newUrl.$$route.authentication && !$window.sessionStorage.token) {
          $location.path('/');
        }
      });
  });
