'use strict';

angular.module('sharpWarsWebServiceApp')
  .controller('MainCtrl', function ($scope, $translate) {
    $scope.changeLanguage = function (language) {
      $translate.use(language);
    };
    $scope.authors = [
      {'fName': 'Patryk', 'lName': 'Urban'},
      {'fName': 'Andrzej', 'lName': 'Joskowski'},
      {'fName': 'Michał', 'lName': 'Żyłowski'},
      {'fName': 'Adrian', 'lName': 'Pielech'}
    ];
  });
