/**
 * Error responses
 */

'use strict';

var generic = {
  InternalServerError: {status: 500, message: "Internal Server Error"}
};

var users = {
  //success
  Created: {status: 201, message: "User has been created. Check your mailbox to finish registration process."},
  Activated: {status: 204, message: "User has been activated."},
  //errors
  NotCreated: {status: 500, message: "Cannot create user"},
  UserAlreadyExists: {status: 400, message: "User Already Exists"},
  UserAlreadyActivated: {status: 400, message: "User Already Activated"},
  UserNotExists: {status: 404, message: "User Not Exists"}
};

var auth = {
  Unauthorized: {status: 401, message: "Unauthorized"}
};

module.exports.httpStatuses = {
  Generic: generic,
  Users: users,
  Auth: auth
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
