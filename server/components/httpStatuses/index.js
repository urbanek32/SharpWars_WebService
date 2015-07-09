/**
 * Error responses
 */

'use strict';

var generic = {
  InternalServerError: {status: 500, message: "Internal Server Error"}
};

var users = {
  //success
  Created: {status: 201, message: "User created"},
  //errors
  NotCreated: {status: 500, message: "Cannot create user"}
};

module.exports.httpStatuses = {
  Generic: generic,
  Users: users
};

module.exports[404] = function pageNotFound(req, res) {
  var viewFilePath = '404';
  var statusCode = 404;
  var result = {
    status: statusCode
  };

  res.status(result.status);
  res.render(viewFilePath, function (err) {
    if (err) { return res.json(result, result.status); }

    res.render(viewFilePath);
  });
};
