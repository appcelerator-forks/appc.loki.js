"use strict";
var Collection = (function () {
    function Collection(name, _loki) {
        this.name = name;
        this._loki = _loki;
        this._parseName();
    }
    Collection.prototype.exists = function () {
        var _this = this;
        var result = false;
        (this._loki.database.collections).forEach(function (collection, index) {
            if (collection.name === _this.name) {
                result = true;
                _this._collection = _this._loki.database.collections[index];
                return;
            }
        });
        return result;
    };
    Collection.prototype.getDatabase = function () {
        return this._loki.getDatabase();
    };
    Collection.prototype.getDb = function () {
        return this.getDatabase();
    };
    Collection.prototype.getCollection = function () {
        var _this = this;
        var __collection;
        (this._loki.database.collections).forEach(function (collection, index) {
            if (collection.name === _this.name) {
                _this._collection = _this._loki.database.collections[index];
                __collection = _this._collection;
            }
        });
        return __collection;
    };
    Collection.prototype._parseName = function () {
        if ((this.name).indexOf('com.loki.js') >= 0) {
            this.name = (this.name).replace("com.loki.js/", "");
        }
    };
    return Collection;
}());
exports.Collection = Collection;
//# sourceMappingURL=Collection.js.map