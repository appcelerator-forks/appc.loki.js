"use strict";
var Query_1 = require("./Query");
var Persist = (function () {
    function Persist(_collection) {
        this.collection = _collection.getCollection();
        this.db = _collection.getDatabase();
    }
    Persist.prototype.insert = function (document) {
        var result = (this.collection).insert(document);
        this.db.saveDatabase();
        return result;
    };
    Persist.prototype.upsert = function (modelId, document) {
        if (!modelId || !document) {
            throw new Error("You must provide a Model id and data Object, that will be persisted");
        }
        var criteria = new Query_1.Query(this.collection);
        var model = criteria.findOneById(parseInt(modelId));
        (Object.keys(document)).map(function (item) {
            if (item !== "meta") {
                model[item] = document[item];
            }
        });
        if (model) {
            var result = (this.collection).update(model);
            this.db.saveDatabase();
            return result;
        }
        else {
            throw new Error('Could not find model');
        }
    };
    Persist.prototype.remove = function (modelId) {
        if (!modelId) {
            throw new Error("You must provide a Model id and data Object, that will be persisted");
        }
        var criteria = new Query_1.Query(this.collection);
        var model = criteria.findOneById(parseInt(modelId));
        if (model) {
            var result = (this.collection).remove(model);
            this.db.saveDatabase();
            return result;
        }
        else {
            throw new Error('Could not find model');
        }
    };
    Persist.prototype.removeAll = function () {
        var criteria = new Query_1.Query(this.collection);
        var model = criteria.findAll();
        if (model) {
            var result = (this.collection).remove(model);
            this.db.saveDatabase();
            return result;
        }
        else {
            throw new Error('Could not find model');
        }
    };
    return Persist;
}());
exports.Persist = Persist;
//# sourceMappingURL=Persist.js.map