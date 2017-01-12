'use strict';

require('../_init');

var should = require('should'),
    _ = require('underscore'),
    Arrow = require('Arrow');

describe('Connector query', () => {

    it("should query for objects", (next) => {
        const _model = Arrow.Model.getModel('appc.loki.js/users');
        var options = {
            where: {age: {$gt: 20} }
        };
        _model.query(options, (err, resp) => {
            should(err).not.be.ok;
            should(resp).be.ok;
            should(resp).be.Array;
            next();
        });
    });
});