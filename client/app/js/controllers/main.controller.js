'use strict';

angular.module('sharpWarsWebServiceApp')
  .controller('MainCtrl', function ($scope, $translate) {
    $scope.changeLanguage = function (language) {
      $translate.use(language);
    };
    $scope.authors = [
      {'fName': 'Andrzej', 'lName': 'Joskowski | '},
      {'fName': 'Adrian', 'lName': 'Pielech | '},
      {'fName': 'Patryk', 'lName': 'Urban | '},
      {'fName': 'Michał', 'lName': 'Żyłowski'  }
    ];
  });
