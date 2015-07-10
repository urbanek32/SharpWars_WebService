'use strict';

angular.module('sharpWarsWebServiceApp')
  .controller('FooterCtrl', function ($scope) {
    $scope.autorzy = [{
      'imie': 'Andrzej',
      'nazwisko': 'Joskowski | '
    },{
      'imie': 'Adrian',
      'nazwisko': 'Pielech | '
    },{
      'imie': 'Patryk',
      'nazwisko': 'Urban | '
    },{
      'imie': 'Michał',
      'nazwisko': 'Żyłowski'
    }];
  });
