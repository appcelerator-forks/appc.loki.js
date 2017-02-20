// // /* global init, assertFailure, dump, state */
'use strict';

require('../_init');

var should = require('should'),
    _ = require('underscore'),
    Arrow = require('arrow');

describe('Connector CREATE and UPDATE', () => {
    var self = this;
    var __instance;
    var newObject;

    it("should be able to create objects", (next) => {

        const __model = Arrow.Model.getModel('appc.loki.js/users');
        const newModel = {
            name: 'Fiodor Zaiuchuk',
            weapons: "['ram']",
            Age: "44"
        };
    
        __model.create(newModel, (_error, _instance) => {
            should(_error).be.not.ok;
            should(_instance).be.ok;
            __instance = _instance;
            next();
        });
    });

    it("should be able to update objects", (next) => {
        const _model = Arrow.Model.getModel('appc.loki.js/users');
        
        newObject = {
            name: 'John Doe',
            Age: "42"
        };

        // var instance = _model.instance(newObject);

        _model.upsert(__instance.getPrimaryKey(), newObject, (err, resp) => {
            should(err).not.be.ok;
            should(resp).be.ok;
            next();
        });
    });

    after("should be able to delete objects", (next) => {
        const _model = Arrow.Model.getModel('appc.loki.js/users');
        _model.delete(__instance, (err, resp) => {
            should(err).not.be.ok;
            should(resp).be.ok;
            next();
        });
    });
});

