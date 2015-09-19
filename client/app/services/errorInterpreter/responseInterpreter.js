'use strict';

angular.module('sharpWarsWebServiceApp')
  .service('responseInterpreter', function () {
    this.interpreter = function(errors) {
      var errorMessages = [];
      for(var err in errors) {
        errorMessages.push(errors[err].stack || errors[err].message);
      }
      return errorMessages;
    };

    /* jshint ignore:start */
    this.responseBuilder = function(serverResponse, dialogTemplates, $translateProvider) {
      if(serverResponse.length > 1) {
        return this.interpreter(serverResponse);
      } else if(serverResponse.ID) {
        var currentLanguage = $translateProvider.use();

        if(Math.floor(serverResponse.status / 100) === 2) {
          return dialogTemplates[serverResponse.group]['success'][currentLanguage][serverResponse.ID];
        } else {
          return [dialogTemplates[serverResponse.group]['error'][currentLanguage][serverResponse.ID] || 'Unknown platform error' ];
        }
      }
    };
    /* jshint ignore:end */
  });
