'use strict';

angular.module('sharpWarsWebServiceApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'pascalprecht.translate'
])
  .config(function ($routeProvider, $locationProvider, $translateProvider) {
    $routeProvider
      .otherwise({
        redirectTo: '/'
      });

    $locationProvider.html5Mode(true);

    $translateProvider.useStaticFilesLoader({
      prefix: 'assets/locale/',
      suffix: '.json'
    });
    $translateProvider.preferredLanguage('pl');
    $translateProvider.useSanitizeValueStrategy('escapeParameters');
});

angular.module('sharpWarsWebServiceApp').config(function ($httpProvider) {
  $httpProvider.interceptors.push('authInterceptor');
});

