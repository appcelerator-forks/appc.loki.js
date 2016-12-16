var Client = require('../utils/Client').Client;
/**
 * Connects to your data store; this connection can later be used by your connector's methods.
 * @param next
 */
exports.disconnect = function (next) {
    this.loki.disconnect(next);
};