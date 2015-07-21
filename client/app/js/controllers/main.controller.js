'use strict';

angular.module('sharpWarsWebServiceApp')
  .controller('MainCtrl', function ($scope, $translate) {
    $scope.changeLanguage = function (language) {
      $translate.use(language);
    };
    $scope.authors = [
      {'f_name': 'Andrzej', 'l_name': 'Joskowski | '},
      {'f_name': 'Adrian', 'l_name': 'Pielech | '},
      {'f_name': 'Patryk', 'l_name': 'Urban | '},
      {'f_name': 'Michał', 'l_name': 'Żyłowski'  }
    ];
  });
