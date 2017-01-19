/* global init, assertFailure, dump, state */
'use strict';

require('../_init');

const should = require('should'),
    _ = require('underscore'),
    Arrow = require('Arrow'),
    Schema = require('../../lib/utils/Schema').Schema;

describe('Schema', () => {
    const collections = require('../collections.mock');
    let schema;

    before((next) => {
        schema = new Schema(collections);
        next();
    });

    it('should be able to create an object', (next) => {
        should(schema.collections).be.ok();
        should(schema._schema).be.ok();
        should(schema._schema.length).be.equal(0);
        next();
    });

    it('should get a schema', (next) => {
        should(schema.getSchema()).be.ok();
        should(schema.getSchema()).be.type('object');
        next();
    });

    it('should be able to create a new schema', (next) => {
        should(schema.createSchema).be.ok();
        next();
    });
});