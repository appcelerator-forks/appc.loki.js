/* global init, assertFailure, dump, state */
'use strict';

require('../_init');

const should = require('should'),
    _ = require('underscore'),
    Arrow = require('Arrow'),
    Collection = require('../../lib/utils/Collection').Collection,
    Client = require('../../lib/utils/Client').Client,
    Query = require('../../lib/utils/Query').Query;

describe('Query', () => {
    let connector = require('../connector.mock'),
        collectionName = 'appc.loki.js/users',
        loki = new Client(connector),
        collection,
        query;

    before((next) => {
        loki.connect(next);
        collection = new Collection(collectionName, loki);
        query = new Query(collection);
    });

    it('should be able to create an object', (next) => {
        should(query.collection).be.ok();
        should(query.collection).be.type('object');
        should(query.collection.name).be.equal('users');
        next();
    });

    it('should be able to create a query', (next) => {
        let _query = { '$eq': { '$loki': 1 } };
        should(query.createQuery(_query)).be.ok();
        let _loki = query.createQuery(_query).$loki;
        should(_loki.$eq).be.equal(_query.$eq.$loki);
        next();
    });

    it('should return count of collections', (next) => {
        should(query.count()).be.equal(0);
        next();
    });
});

describe('Connector query', () => {

    it("should query for objects", (next) => {
        const _model = Arrow.Model.getModel('appc.loki.js/users');
        var options = {
            where: { age: { $gt: 20 } }
        };
        _model.query(options, (err, resp) => {
            should(err).not.be.ok;
            should(resp).be.ok;
            should(resp).be.Array;
            next();
        });
    });

    it("should query for an object", (next) => {
        const _model = Arrow.Model.getModel('appc.loki.js/users');
        var options = {
            where: { age: { $eq: 32 } }
        };
        _model.query(options, (err, resp) => {
            should(err).not.be.ok;
            should(resp).be.ok;
            should(resp).be.Array;
            should(resp).have.lengthOf(1);
            next();
        });
    });

    it("should query for not existing object", (next) => {
        const _model = Arrow.Model.getModel('appc.loki.js/users');
        var options = {
            where: { age: { $gt: 80 } }
        };
        _model.query(options, (err, resp) => {
            should(err).not.be.ok;
            should(resp).be.ok;
            should(resp).be.Array;
            should(resp).have.lengthOf(0);
            next();
        });
    });
});