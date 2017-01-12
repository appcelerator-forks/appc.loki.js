/* global init, assertFailure, dump, state */
'use strict';

require('../_init');

var should = require('should'),
    _ = require('underscore'),
    Arrow = require('Arrow');

describe('Connector CREATE and UPDATE', () => {
    var self = this;
    var _id;

    it("should be able to create objects", (next) => {

        const _model = Arrow.Model.getModel('appc.loki.js/users');
        const newModel = {
            name: 'Fiodor Zaiuchuk',
            weapons: "['ram']",
            Age: "44"
        };
        let __model = Arrow.Model.getModel('appc.loki.js/users');
        //create a new model
        __model.create(newModel, (_error, _instance) => {
            var __instance = _instance.toPayload();

            should(_error).be.not.ok;
            should(__instance).be.ok;
            _id = __instance.$loki;
            should(__instance.$loki).be.a.String;
            next();
        });
    });

    after("", (next) => {
        const _model = Arrow.Model.getModel('appc.loki.js/users');
        _model.delete(_id, (err, resp) => {
            should(err).not.be.ok;
            _model.findByID(_id, (err, resp) => {
                should(err).be.ok;
                next();
            });
        });

    });

});