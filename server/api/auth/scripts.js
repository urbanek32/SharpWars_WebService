'use strict';

var scriptsEntities = require('../../entities/scripts-entities'),
  httpStatuses = require('../../components/httpStatuses').httpStatuses,
  logger = require('../../lib/logger/logger').init();


var addNewScript = function(username, options, callback) {
  var newScript = {
    name: options.name,
    description: options.description,
    code: options.code,
    owner: username
  };
  scriptsEntities.findLobbyByNameAndOwner(newScript.name, username, function(err, script) {
    if(!err) {
      if(!script) {
        scriptsEntities.addNewScript(newScript, function(err, result) {
          if(!err) {
            logger.debug("Script " + newScript.name + " has been created.");
            callback(null, httpStatuses.Scripts.Created);
          } else {
            logger.error("Internal Server Error: " + JSON.stringify(err));
            callback(httpStatuses.Generic.InternalServerError, null)
          }
        })
      } else {
        logger.debug("Cannot add script: name " + newScript.name + " already exists.");
        callback(httpStatuses.Scripts.AlreadyExists, null);
      }
    } else {
      logger.error("Internal Server Error: " + JSON.stringify(err));
      callback(httpStatuses.Generic.InternalServerError, null)
    }
  })
};

var removeScriptSecretData = function(scripts) {
  for(var script in scripts) {
    delete scripts[script].owner;
  }
  return scripts;
};

var getListOfScripts = function(callback) {
  scriptsEntities.getAllScripts(function(err, scripts) {
    if(!err && scripts) {
      logger.info("Scripts array sent.");
      callback(null, removeScriptSecretData(scripts));
    } else {
      logger.error("Internal Server Error: " + JSON.stringify(err));
      callback(httpStatuses.Generic.InternalServerError, null);
    }
  })
};

var updateScript = function(oldScriptName, username, options, callback) {
  scriptsEntities.findScriptByNameAndOwner(oldScriptName, username, function(err, script) {
    if(!err) {
      if(script) {
        var updatedScript = {
          name: options.name,
          description: options.description,
          code: options.code
        };
        scriptsEntities.updateByNameAndOwner(oldScriptName, username, updatedScript, function(err, result) {
          if(!err && result) {
            logger.info("Script " + oldScriptName + " updated.");
            callback(null, httpStatuses.Scripts.Updated);
          } else {
            logger.error("Internal Server Error: " + JSON.stringify(err));
            callback(httpStatuses.Generic.InternalServerError, null);
          }
        });
      } else {
        logger.debug("Cannot update script: script " + oldScriptName + " not exists.");
        callback(httpStatuses.Scripts.NotExists, null);
      }
    } else {
      logger.error("Internal Server Error: " + JSON.stringify(err));
      callback(httpStatuses.Generic.InternalServerError, null);
    }
  });
};


module.exports = {
  addNewScript: addNewScript,
  getListOfScripts: getListOfScripts,
  updateScript: updateScript
};
