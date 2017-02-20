/* global init, assertFailure, dump, state */
'use strict';

require('../_init');

const should = require('should'),
    _ = require('underscore'),
    Arrow = require('arrow'),
    Collection = require('../../lib/utils/Collection').Collection,
    Client = require('../../lib/utils/Client').Client,
    Persist = require('../../lib/utils/Persist').Persist;

describe('Persist', () => {
    let connector = require('../connector.mock'),
        collectionName = 'appc.loki.js/users',
        loki = new Client(connector),
        collection,
        persist;

    beforeEach((next) => {
        loki.connect(next);
        collection = new Collection(collectionName, loki);
        persist = new Persist(collection);
    });

    it('should be able to create an object', (next) => {
        should(persist.collection).be.ok();
        should(persist.db).be.ok();
        next();
    });

    it('should insert a document', (next) => {
        let document = {
            "name": "John",
            "Age": "23"
        };

        should(persist.insert(document)).be.ok();

        let len = persist.collection.idIndex.length;
        let lastElement = persist.collection.data[len - 1];
        let idLastElement = persist.collection.idIndex[len - 1];
        should(lastElement.name).be.equal('John');
        persist.remove(idLastElement);
        next();
    });

    it('should upsert a document', (next) => {
        let document = {
            "name": "John",
            "Age": "23"
        };

        let newDocument = {
            "name": "Jane"
        };

        persist.insert(document);
        let len = persist.collection.idIndex.length;
        let idLastElement = persist.collection.idIndex[len - 1];
        should(persist.upsert(idLastElement, newDocument)).be.ok();

        let lastElement = persist.collection.data[len - 1];
        should(lastElement.name).be.equal('Jane');
        persist.remove(idLastElement);
        next();
    });

    it('should remove a document by id', (next) => {
        let document = {
            "name": "John",
            "Age": "23"
        };

        let oldLengthData = persist.collection.data.length;
        persist.insert(document);
        let lengthIdArray = persist.collection.idIndex.length;
        let idLastElement = persist.collection.idIndex[lengthIdArray - 1];

        should(persist.collection.data.length).be.equal(oldLengthData + 1);
        should(persist.remove(idLastElement)).be.ok();
        should(persist.collection.data.length).be.equal(oldLengthData);
        next();
    });

    it('should NOT remove a document with empty id', (next) => {
        should(function () {
            persist.remove();
        }).throw();
        next();
    });

    it('should NOT remove a document with invalid id', (next) => {
        let id = 111;

        should(function () {
            persist.remove(id);
        }).throw();
        next();
    });

    it('should NOT upsert a document with invalid id', (next) => {
        let document = {
            "name": "John",
        },
            id = 11;

        should(function () {
            persist.upsert(id, document);
        }).throw();
        next();
    });
});