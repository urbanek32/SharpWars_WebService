/**
 * Error responses
 */

'use strict';

var generic = {
  InternalServerError: {status: 500, group: 'Generic', ID: 'InternalServerError'}
};

var users = {
  //success
  Created: {status: 201, group: 'Users', ID: "Created"},
  Activated: {status: 204, group: 'Users', ID: 'Activated'},
  ResetPasswordTokenSent: {status: 200, group: 'Users', ID: 'ResetPasswordTokenSent'},
  PasswordChanged: {status: 200, group: 'Users', ID: 'PasswordChanged'},
  Updated: {status: 204, group: 'Users', ID: 'Updated'},
  //errors
  AlreadyExists: {status: 409, group: 'Users', ID: 'AlreadyExists'},
  AlreadyActivated: {status: 404, group: 'Users', ID: 'AlreadyActivated'},
  NotExists: {status: 404, group: 'Users', ID: 'NotExists'},
  NotActivated: {status: 404, group: 'Users', message: 'NotActivated'}
};

var auth = {
  //errors
  Unauthorized: {status: 401, group: "Auth", ID: "Unauthorized"},
  PasswordEmpty: {status: 400, group: 'Auth', ID: "PasswordEmpty"},
  InvalidToken: {status: 401, group: 'Auth', ID: "InvalidToken."}
};

var lobby = {
  //success
  Created: {status: 201, group: 'Lobby', ID: 'Created'},
  UserAdded: {status: 201, group: 'Lobby', ID: 'UserAdded'},
  Started: {status: 204, group: 'Lobby', ID: 'Started'},
  Restarted: {status: 204, group: 'Lobby', ID: 'Restarted'},
  Stopped: {status: 204, group: 'Lobby', ID: 'Stopped'},
  PlayerRemoved: {status: 204, group: 'Lobby', ID: 'PlayerRemoved'},
  PlayerUpdated: {status: 204, group: 'Lobby', ID: 'PlayerUpdated'},
  Deleted: {status: 204, group: 'Lobby', ID: 'Deleted'},
  //errors
  Unauthorized: {status: 401, group: 'Lobby', ID: 'Unauthorized'},
  AlreadyExists: {status: 409, group: 'Lobby', ID: 'AlreadyExists'},
  AlreadyCreated: {status: 400, group: 'Lobby', ID: 'AlreadyCreated'},
  NotExists: {status: 404, group: 'Lobby', ID: 'NotExists'},
  Full: {status: 409, group: 'Lobby', ID: 'Full'},
  NotFull: {status: 409, group: 'Lobby', ID: 'NotFull'},
  NotReady: {status: 409, group: 'Lobby', ID: 'NotReady'},
  UserExists: {status: 409, group: 'Lobby', ID: 'UserExists'},
  UserNotExists: {status: 404, group: 'Lobby', ID: 'UserNotExists'},
  MasterLeave: {status: 400, group:' Lobby', ID: 'MasterLeave'},
  AlreadyStarted: {status: 400, group: 'Lobby', ID: 'AlreadyStarted'},
  AlreadyStopped: {status: 400, group: 'Lobby', ID: 'AlreadyStopped'},
  NotAssignedToAnyLobby: {status: 404, group: 'Lobby', ID: 'NotAssignedToAnyLobby'},
  PlayerNotStartedYetOrFinished: {status: 409, group: 'Lobby', ID: 'PlayerNotStartedYetOrFinished'}
};

var scripts = {
  //success
  NotChanged: {status: 200, group: 'Scripts', ID: 'NotChanged'},
  Created: {status: 201, group: 'Scripts', ID: 'Created'},
  Updated: {status: 204, group: 'Scripts', ID: 'Updated'},
  Deleted: {status: 204, group: 'Scripts', ID: 'Deleted'},
  //errors
  AlreadyExists: {status: 409, group: 'Scripts', ID: 'AlreadyExists'},
  NameAlreadyExists: {status: 409, group: 'Scripts', ID: 'NameAlreadyExists'},
  NotExists: {status: 404, group: 'Scripts', ID: 'NotExists'}
};

var scores = {
  //success
  Added: {status: 201, group: 'Scores', ID: 'Added'},
  //errors
  EmptyScores: {status: 404, group: 'Scores', ID: 'EmptyScores'}
};

module.exports.httpStatuses = {
  Generic: generic,
  Users: users,
  Auth: auth,
  Lobby: lobby,
  Scripts: scripts,
  Scores: scores
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
