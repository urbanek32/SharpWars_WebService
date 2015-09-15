'use strict';

angular.module('sharpWarsWebServiceApp')
  .service('errorInterpreter', function () {
    this.interpreter = function(errors) {
      var errorMessages = [];
      for(var err in errors) {
        errorMessages.push(errors[err].stack || errors[err].message);
      }
      return errorMessages;
    };
  });
