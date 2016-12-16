"use strict";
var Schema = (function () {
    function Schema(collections) {
        this.collections = collections;
        this._schema = new Array();
    }
    Schema.prototype.getSchema = function () {
        return this._schema;
    };
    Schema.prototype.createSchema = function () {
        if (typeof this.collections !== "undefined" && this.collections.length > 0) {
            this.scanCollections();
        }
    };
    Schema.prototype.scanCollections = function () {
        for (var i = 0; i < this.collections.length; i++) {
            this._persistSchema(this.collections[i]);
        }
    };
    Schema.prototype._persistSchema = function (collection) {
        var object = {
            name: collection.name,
            fields: []
        };
        var _fields = ['id'];
        if (typeof collection.data[0] !== "undefined") {
            (Object.keys(collection.data[0])).forEach(function (key) {
                if (key !== "$loki")
                    _fields.push(key);
            });
        }
        object.fields = _fields;
        this._schema[collection.name] = object;
    };
    return Schema;
}());
exports.Schema = Schema;
//# sourceMappingURL=Schema.js.map