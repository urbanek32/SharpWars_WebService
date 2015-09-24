/**
 * Main application routes
 */

'use strict';

var errors = require('./components/httpStatuses'),
  config = require('./config/customConfig'),
  expressJwt = require('express-jwt');

module.exports = function(app) {

  // Insert routes below
  app.use('/api/users', require('./handlers/users'));
  app.use('/auth/api/users', expressJwt({secret: config.auth.key}));
  app.use('/auth/api/users', require('./handlers/auth/users'));
  app.use('/auth/api/users/:username/lobby', require('./handlers/auth/lobby'));
  app.use('/auth/api/users/:username/game', require('./handlers/auth/game'));
  app.use('/auth/api/users/:username/scripts', require('./handlers/auth/scripts'));

  //test routes
  app.use('/test/api/', require('./handlers/test'));
  app.use('/auth/api/users/test/api/', require('./handlers/test'));

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendfile(app.get('appPath') + '/index.html');
    });
};
