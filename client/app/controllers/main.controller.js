'use strict';

angular.module('sharpWarsWebServiceApp')
  .controller('MainCtrl', function ($scope, $translate) {
    $scope.changeLanguage = function (language) {
      $translate.use(language);
    };
  });
