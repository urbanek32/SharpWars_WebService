'use strict';

angular.module('sharpWarsWebServiceApp')
  .controller('FooterCtrl', function ($scope) {
    $scope.authors = [{
      'f_name': 'Andrzej',
      'l_name': 'Joskowski | '
    },{
      'f_name': 'Adrian',
      'l_name': 'Pielech | '
    },{
      'f_name': 'Patryk',
      'l_name': 'Urban | '
    },{
      'f_name': 'Michał',
      'l_name': 'Żyłowski'
    }];
  });
