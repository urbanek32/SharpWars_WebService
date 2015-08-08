'use strict';

var remoteAddressExtractor = function(req) {
  return req.headers['x-real-ip'] || req.connection.remoteAddress;
};

module.exports = remoteAddressExtractor;
