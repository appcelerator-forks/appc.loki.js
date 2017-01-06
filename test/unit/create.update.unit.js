/* global init, assertFailure, dump, state */
'use strict';

require('../_init');

var should = require('should'),
    _ = require('underscore'),
    Arrow = require('Arrow');

describe('Connector CREATE and UPDATE', () => {
    var self = this;

    it("should be able to create objects", (next) => {
        const _model = Arrow.Model.getModel('appc.loki.js/users');
        const newModel = {
            name: 'Fiodor Zaiuchuk',
            weapons: ["ram"],
            Age: 44
        };
        let __model = Arrow.Model.getModel('appc.loki.js/users');
        //create a new model
        __model.create(newModel, (_error, _instance) => {
            dump(_instance);
            should(_error).be.not.ok;
            should(_instance).be.ok;
            should(_instance.getPrimaryKey()).be.a.String;
            should(_instance.getPrimaryKey().length).be.greaterThan(0);
            next();
        });
    });

});