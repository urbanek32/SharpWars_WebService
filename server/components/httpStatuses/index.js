/**
 * Error responses
 */

'use strict';

var generic = {
  InternalServerError: {status: 500, message: "Internal Server Error"}
};

var users = {
  //success
  Created: [{status: 201, message: "User has been created. Check your mailbox to finish registration process."}],
  Activated: [{status: 204, message: "User has been activated."}],
  ResetPasswordTokenSent: [{status: 200, message: "Reset password token has been sent."}],
  PasswordChanged: [{status: 200, message: "Password has been changed."}],
  Updated: [{status: 204, message: "User has been updated."}],
  //errors
  NotCreated: [{status: 500, message: "Cannot create user"}],
  AlreadyExists: [{status: 400, message: "User Already Exists"}],
  AlreadyActivated: [{status: 400, message: "User Already Activated"}],
  NotExists: [{status: 404, message: "User Not Exists"}],
  NotActivated: [{status: 404, message: "User not activated"}]
};

var auth = {
  Unauthorized: [{status: 401, message: "Unauthorized"}],
  PasswordEmpty: [{status: 400, message: "Password cannot be empty"}]
};

var lobby = {
  //success
  Created: [{status: 201, message: "Lobby has been created."}],
  UserAdded: [{status: 201, message: "User has been added to the lobby."}],
  Started: [{status: 204, message: "Lobby has been started the game."}],
  Stopped: [{status: 204, message: "Lobby has been stopped the game."}],
  PlayerUpdated: [{status: 204, message: "Player status has been updated."}],
  //errors
  AlreadyExists: [{status: 400, message: "Lobby already exists."}],
  NotExists: [{status: 404, message: "Lobby not exists."}],
  Full: [{status: 400, message: "No available slots."}],
  NotFull: [{status: 400, message: "More players required."}],
  NotReady: [{status: 400, message: "Not each player is ready."}],
  UserExists: [{status: 400, message: "User already joined in lobby."}],
  AlreadyStarted: [{status: 400, message: "Lobby game has been already started."}],
  AlreadyStopped: [{status: 400, message: "Lobby game has been already stopped."}]
};

module.exports.httpStatuses = {
  Generic: generic,
  Users: users,
  Auth: auth,
  Lobby: lobby
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
