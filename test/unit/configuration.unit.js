/* global init, assertFailure, dump, state */
'use strict';

require('../_init');

const should = require('should'),
    _ = require('underscore'),
    Arrow = require('Arrow'),
    Configuration = require('../../lib/utils/Configuration').default;

describe('Configuration', () => {
    let defaultConfig = require('../conf/default'),
        configuration;

    before((next) => {
        configuration = new Configuration(defaultConfig);
        next();
    });

    it('should get a database name', (next) => {
        should(configuration.getDbName()).be.ok();
        should(configuration.getDbName()).be.equal(configuration.db);        
        next();
    });

    it('should get a path', (next) => {
        should(configuration.getPath()).be.ok();
        should(configuration.getPath()).be.equal(configuration.path); 
        next();
    });

    it('should get a database file', (next) => {
        let fullPath = configuration.path + configuration.db;
        should(configuration.getDbFile()).be.ok();
        should(configuration.getDbFile()).be.equal(fullPath); 
        next();
    });

    it('should keep alive', (next) => {
        should(configuration.shouldKeepAlive()).be.equal(false);
        next();
    });
});