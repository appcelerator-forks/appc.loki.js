/* global init, assertFailure, dump, state */
'use strict';

require('../_init');

const should = require('should'),
    _ = require('underscore'),
    Arrow = require('Arrow'),
    Collection = require('../../lib/utils/Collection').Collection,
    Client = require('../../lib/utils/Client').Client;

describe('Collection', () => {
    let connector = require('../connector.mock'),
        collectionName = 'appc.loki.js/users',
        loki = new Client(connector),
        collection;

    before((next) => {
        loki.connect(next);
        collection = new Collection(collectionName, loki);
    });

    it('should be able to create an object', (next) => {
        should(collection.name).be.equal('users');
        next();
    });

    it('should return true for exists collection', (next) => {
        should(collection.exists()).be.ok();
        should(collection.exists()).be.equal(true);
        next();
    });

    it('should get loki database', (next) => {
        let db = collection.getDatabase();
        should(collection.getDatabase()).be.ok();
        should(db.collections[0].name).be.equal('users');
        next();
    });

    it('should get a database', (next) => {
        let db = collection.getDb();
        should(collection.getDb()).be.ok();
        should(db.collections[0].name).be.equal('users');
        next();
    });

    it('should get collection', (next) => {
        should(collection.getCollection()).be.ok();
        should(collection.getCollection().name).be.equal(collection.name);
        next();
    });
});