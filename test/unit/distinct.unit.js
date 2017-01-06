/* global init, assertFailure, dump, state */
'use strict';

require('../_init');

var should = require('should'),
    _ = require('underscore'),
    Arrow = require('Arrow');

describe('Connector DISTINCT', () => {
    var self = this;

    it("should distinct objects", (next) => {
        const _model = Arrow.Model.getModel('appc.loki.js/users');
        let newModel = {
            name: 'Gunar Bersavski',
            weapons: ["sword"],
            Age: 14
        };
        //find all records
        _model.count({}, (error, nrModels) => {
            should(error).be.not.ok;
            //check if the number of models is > distinct models
            _model.distinct('name', {}, (error, data) => {
                should(error).be.not.ok;
                should(data.length < nrModels).be.true();
                next();
            });
        });
    });

});