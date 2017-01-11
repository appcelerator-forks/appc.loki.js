/* global init, assertFailure, dump, state */
'use strict';

require('../_init');

var should = require('should'),
    _ = require('underscore'),
    Arrow = require('Arrow');

describe('Connector findByID', () => {
    var self = this;

    it("should find an object by ID", (next) => {
        const _model = Arrow.Model.getModel('appc.loki.js/users');
        _model.findByID(1, (err, resultModel) => {
            should(err).not.be.ok;
            should(resultModel).be.ok;
            next();
        });
    });

    it("should return Collection data", (next) => {
        const _model = Arrow.Model.getModel('appc.loki.js/users');
        // Call the method
        _model.findByID(1, (err, resultModel) => {
            let _resData = ['Age', 'name', 'weapons'];
            should(err).not.be.ok;
            should(resultModel).be.ok;
            _resData.forEach((item) => {
                should(resultModel.hasOwnProperty(item)).be.true("Expected '" + item + "' to be a part of this list!");
            });
            next();
        });
    });


    it("should NOT find objects with onvalid ID", (next) => {
        const _model = Arrow.Model.getModel('appc.loki.js/users');
        _model.findByID(45, (err, resultModel) => {
            should(err).not.be.ok;
            should(resultModel).not.be.ok;
            next();
        });
    });



});