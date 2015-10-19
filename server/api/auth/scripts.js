'use strict';

var scriptsEntities = require('../../entities/scripts-entities'),
  httpStatuses = require('../../components/httpStatuses').httpStatuses,
  logger = require('../../lib/logger/logger').init();


var addNewScript = function(username, options, callback) {
  var newScript = {
    name: options.name,
    description: options.description,
    code: options.code,
    owner: username,
    codeRevisions: [
      {
        dateTime: Date.now(),
        codeLength: options.code.length,
        code: options.code
      }
    ]
  };
  scriptsEntities.findScriptByNameAndOwner(newScript.name, username, function(err, script) {
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

var getListOfScriptsForUser = function(username, callback) {
  scriptsEntities.getAllScriptsForUser(username, function(err, scripts) {
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
  scriptsEntities.findScriptByNameAndOwner(oldScriptName, username, function(err, scriptForUpdate) {
    if(!err) {
      if(scriptForUpdate) {
        scriptsEntities.findScriptByNameAndOwner(options.name, username, function(err, script) {
          if (!err) {
            if (!script || options.name === oldScriptName) {
              if(options.description !== scriptForUpdate.description ||
                options.code !== scriptForUpdate.code ||
                options.name !== scriptForUpdate.name) {
                var updatedScript = {
                  name: options.name,
                  description: options.description,
                  code: options.code,
                  owner: username,
                  codeRevisions: scriptForUpdate.codeRevisions
                };
                updatedScript.codeRevisions.push(
                  {
                    dateTime: Date.now(),
                    codeLength: options.code.length,
                    code: options.code
                  }
                );
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
                logger.debug("Cannot update script: name " + options.name + " is already used.");
                callback(null, httpStatuses.Scripts.NotChanged);
              }
            }
            else {
              logger.debug("Cannot update script: name " + options.name + " is already used.");
              callback(httpStatuses.Scripts.NameAlreadyExists, null);
            }
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

var getScript = function(scriptName, username, callback) {
  scriptsEntities.findScriptByNameAndOwner(scriptName, username, function(err, script) {
    if(!err) {
      if(script) {
        delete script.owner;
        logger.info("Script " + scriptName + " informations sent.");
        callback(null, script);
      } else {
        logger.debug("Cannot update script: script " + scriptName + " not exists.");
        callback(httpStatuses.Scripts.NotExists, null);
      }
    } else {
      logger.error("Internal Server Error: " + JSON.stringify(err));
      callback(httpStatuses.Generic.InternalServerError, null)
    }
  })
};

var deleteScript = function(scriptName, username, callback) {
  scriptsEntities.findScriptByNameAndOwner(scriptName, username, function(err, script) {
    if(!err) {
      if(script) {
        scriptsEntities.deleteByNameAndOwner(scriptName, username, function(err, result) {
          if(!err && result) {
            logger.info("Script " + scriptName + " has been deleted.");
            callback(null, httpStatuses.Scripts.Deleted);
          } else {
            logger.error("Internal Server Error: " + JSON.stringify(err));
            callback(httpStatuses.Generic.InternalServerError, null)
          }
        });
      } else {
        logger.debug("Cannot update script: script " + scriptName + " not exists.");
        callback(httpStatuses.Scripts.NotExists, null);
      }
    } else {
      logger.error("Internal Server Error: " + JSON.stringify(err));
      callback(httpStatuses.Generic.InternalServerError, null)
    }
  })
};


module.exports = {
  addNewScript: addNewScript,
  getListOfScriptsForUser: getListOfScriptsForUser,
  updateScript: updateScript,
  getScript: getScript,
  deleteScript: deleteScript
};
