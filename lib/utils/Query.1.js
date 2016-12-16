"use strict";
var Query = (function () {
    function Query(collection) {
        this.collection = collection;
    }
    Query.prototype.find = function (id) {
        if (typeof id !== "undefined" && typeof id === "number") {
            this.where({ '$eq': { '$loki': id } });
            this._statementInitialize();
            return this;
        }
        return this;
    };
    Query.prototype.where = function (query) {
        var _this = this;
        if (typeof query === 'Array') {
            var andStatement_1 = new Object();
            andStatement_1['$and'] = new Array();
            this._statement = false;
            query.map(function (data, index) {
                andStatement_1['$and'].push(_this.creataeQuery(data));
            });
            this._statementCollection = andStatement_1;
        }
        else {
            this._statement = this.creataeQuery(query);
        }
        this._statementInitialize();
        return this;
    };
    Query.prototype.simplesort = function (name) {
        (this.query).simplesort(name);
        return this;
    };
    Query.prototype.offset = function (offset) {
        (this.query).offset(offset);
        return this;
    };
    Query.prototype.limit = function (limit) {
        (this.query).limit(limit);
        return this;
    };
    Query.prototype.one = function () {
        var result = this.execute();
        if (result.length > 0 && result.length < 2) {
            return result[0];
        }
        return null;
    };
    Query.prototype.distinct = function (field) {
        var self = this;
        var dist = [];
        var result = [];
        if (this.query) {
            (this.collection).where(function (elem) {
                if (dist.indexOf(elem[field]) === -1) {
                    dist.push(elem[field]);
                    result.push(elem);
                }
            });
            return result;
        }
        return null;
    };
    Query.prototype.count = function () {
        var self = this;
        var count = 0;
        if (this.query) {
            (this.collection).where(function (elem) {
                count++;
            });
        }
        return count;
    };
    Query.prototype.all = function () {
        if (typeof this.query === "undefined") {
            this._statement = null;
            this._statementInitialize();
        }
        var result = this.execute();
        if (!result || typeof result === "undefined")
            result = new Array();
        return result;
    };
    Query.prototype.execute = function () {
        this._result = (this.query).data();
        return this._result;
    };
    Query.prototype.creataeQuery = function (query) {
        if (typeof query === 'string') {
            try {
                var query = JSON.parse(query);
            }
            catch (error) {
                throw new Error('Passed query should be an Object!' + error);
            }
        }
        if (typeof query !== 'object')
            throw new Error('Passed query should be an Object!');
        var statement = new Statement();
        var _resultQuery = new Object();
        Object.keys(query).forEach(function (key) {
            if (statement.checkCommandExists(key)) {
                _resultQuery = statement.create(key, query[key]);
            }
            else {
                throw new Error("Unsupported command: '" + key + "'!");
            }
        });
        return _resultQuery;
    };
    Query.prototype._statementInitialize = function () {
        if (typeof this._statementCollection !== "undefined") {
            this.query = (this.collection).chain().find(this._statementCollection);
        }
        else {
            this.query = (this.collection).chain().find(this._statement);
        }
    };
    return Query;
}());
exports.Query = Query;
var Statement = (function () {
    function Statement() {
        this._commands = new Array();
        this._commands = [
            '$eq',
            '$dteq',
            '$gt',
            '$gte',
            '$lte',
            '$ne',
            '$regex',
            '$in',
            '$contains',
            '$containsAny',
            '$containsNone',
            '$and',
            '$or'
        ];
    }
    Statement.prototype.create = function (command, data) {
        var result = new Object;
        var key = Object.keys(data)[0] || 'id';
        var value = data[key] || undefined;
        result[key] = new Object();
        result[key][command] = value;
        return result;
    };
    Statement.prototype.checkCommandExists = function (command) {
        var result = this._commands.filter(function (value) {
            return value === command;
        });
        return (result.length > 0);
    };
    return Statement;
}());
//# sourceMappingURL=Query.1.js.map