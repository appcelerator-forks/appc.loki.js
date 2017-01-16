/* global init, assertFailure, dump, state */
'use strict';

require('../_init');

const should = require('should'),
    _ = require('underscore'),
    Arrow = require('Arrow'),
    Client = require('../../lib/utils/Client').Client;

describe('Client', () => {
    const connector = require('../connector.mock');
    let loki = new Client(connector);

    before((next) => {
        loki.connect(next);
    });

    it('should be able to create an object', (next) => {
        should(connector.config.db).equal('appc.loki.json');
        should(connector.loki).be.ok();
        next();
    });

    it('should have correct type of properties', (next) => {
        should(loki.init).be.type('function');
        should(loki.connect).be.type('function');
        should(loki.disconnect).be.type('function');
        should(loki.use).be.type('function');
        should(loki.getDatabase).be.type('function');
        next();
    });

    it('should change collection', (next) => {        
        let db = loki.getDatabase();
        loki.use('test_collection');
        should(db.collections.length).equal(2);
        should(db.collections[1].name).equal('test_collection');
        db.collections.pop();
        next();
    });

    it('should get a database', (next) => {
        let db = loki.getDatabase();
        should(db.collections[0].name).equal('users');
        next();
    });
});