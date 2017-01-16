"use strict";
var lokijs = require('lokijs'), fs = require('fs'), path = require('path');
var Client = (function () {
    function Client(_connector) {
        this._connector = _connector;
        this.init();
        this._collectionsInUse = [];
    }
    Client.prototype.init = function () {
        this.config = this._connector.config;
        var _path = path.join(process.cwd(), this.config.path);
        var options;
        if (this.config.lokiConfiguration) {
            options = this.config.lokiConfiguration;
        }
        this._checkDatabaseFilesExist(_path);
        this.database = new lokijs(_path + this.config.db, options);
    };
    Client.prototype.connect = function (next) {
        this._connector.loki = this;
        this.database.loadDatabase(null, next);
    };
    Client.prototype.disconnect = function (next) {
        if (typeof this.collection !== "undefined") {
            this.database.saveDatabase(function () {
                this.database.close(next);
            }.bind(this));
        }
    };
    Client.prototype.use = function (collection) {
        var _collection = this.collection = this.database.addCollection(collection);
        if (typeof this._collectionsInUse === "undefined") {
            this._collectionsInUse = [];
        }
        this._collectionsInUse.push(_collection);
        return _collection;
    };
    Client.prototype.getDatabase = function () {
        return this.database;
    };
    Client.prototype._checkDatabaseFilesExist = function (path) {
        if (!fs.existsSync(path)) {
            fs.mkdirSync(path);
        }
        if (!fs.existsSync(path + this.config.db)) {
            this.__writeFile(path + this.config.db);
        }
        if (!fs.existsSync(path + this.config.db + '~')) {
            this.__writeFile(path + this.config.db + '~');
        }
        return true;
    };
    Client.prototype.__writeFile = function (filePath) {
        fs.open(filePath, 'w', function (err, fd) {
            if (err) {
                throw new Error('error opening file: ' + err);
            }
            fs.write(fd, "", "UTF-8", function (err) {
                if (err)
                    throw new Error('error writing file: ' + err);
                fs.close(fd);
            });
        });
    };
    return Client;
}());
exports.Client = Client;
//# sourceMappingURL=Client.js.map