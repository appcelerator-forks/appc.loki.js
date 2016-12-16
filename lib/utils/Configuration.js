"use strict";
var Configuration = (function () {
    function Configuration(_config) {
        this._config = _config;
        this.validateConfiguration();
        this.setConfiguration();
    }
    Configuration.prototype.getDbName = function () {
        return this.db;
    };
    Configuration.prototype.getPath = function () {
        return this.path;
    };
    Configuration.prototype.getDbFile = function () {
        return this.path + this.db;
    };
    Configuration.prototype.shouldKeepAlive = function () {
        return this.keepAlive;
    };
    Configuration.prototype.validateConfiguration = function () {
        if (typeof this._config.connectors['com.loki.js']) {
            throw new Error("Please provide connector configuratio to your default.js file");
        }
        if (typeof this._config.connectors['com.loki.js'].db) {
            throw new Error("Please provide connector configuratio to your default.js file");
        }
    };
    Configuration.prototype.setConfiguration = function () {
        this.settings = this._config.connectors['com.loki.js'];
        this.db = this.settings.db;
        this.keepAlive = this.settings.keepAlive || false;
        this.path = this.settings.dataFolder;
    };
    return Configuration;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Configuration;
//# sourceMappingURL=Configuration.js.map