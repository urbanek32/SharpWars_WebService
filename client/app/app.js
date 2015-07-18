'use strict';

angular.module('sharpWarsWebServiceApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute'
])
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .otherwise({
        redirectTo: '/'
      });

    $locationProvider.html5Mode(true);
  });

angular.module('sharpWarsWebServiceApp').config(function ($httpProvider) {
  $httpProvider.interceptors.push('authInterceptor');
});
