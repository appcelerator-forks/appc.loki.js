/* global init, assertFailure, dump, state */
'use strict';

require('../_init');

var should = require('should'),
    _ = require('underscore'),
    Arrow = require('arrow');

describe('Connector', () => {
    var self = this;
    init(self);

    it('should require a minimum version of Arrow', function () {
        var mockConnector = {
            Capabilities: {},
            extend: function () { }
        };

        should(function () {
            require('../../lib/index').create({
                Connector: mockConnector
            });
        }).throw();
        should(function () {
            require('../../lib/index').create({
                Version: '1.2.0',
                Connector: mockConnector
            });
        }).throw();
        should(function () {
            require('../../lib/index').create({
                Version: '1.7.0',
                Connector: mockConnector
            });
        }).not.throw();
    });

    it('should have correct configuration', (next) => {
        state.connector.fetchMetadata((error, data) => {
            let _fields = {
                fields:
                [{
                    type: 'text',
                    required: true,
                    default: '',
                    validator: null,
                    name: 'db',
                    description: 'Database name'
                },
                {
                    type: 'text',
                    required: true,
                    default: '',
                    validator: null,
                    name: 'path',
                    description: 'Path to database folder'
                },
                {
                    type: 'text',
                    required: false,
                    default: '',
                    validator: null,
                    name: 'keepAlive',
                    description: 'Whether to keep a socket open to the connection'
                }]
            };
            should(error).be.exactly(null);
            should(data).be.ok();
            should(data).be.deepEqual(_fields);
            next();
        });
    });

    it("should validate configuration", (next) => {
        state.connector.fetchMetadata((error, data) => {
            let _fields = data.fields;

            should(_fields[0].required).be.true();
            should(_fields[1].required).be.true();
            should(_fields[2].required).be.false();

            next();
        });
    });

    it("should have $loki intialized", (next) => {
        state.connector.fetchMetadata((error, data) => {
            let _fields = data.fields;
            should(_fields[0].required).be.true();
            should(_fields[1].required).be.true();
            should(_fields[2].required).be.false();
            next();
        });
    });

    it('should have correct Capabilities enabled', () => {
        const _capabilities = ['ConnectsToADataSource',
            'ValidatesConfiguration',
            'GeneratesModels',
            'CanCreate',
            'CanRetrieve',
            'CanUpdate',
            'CanDelete'];
        const _methods = [
            'create',
            'delete',
            'deleteAll',
            'distinct',
            'findAll',
            'findAndModify',
            'findByID',
            'query',
            'save',
            'upsert'
        ];
        should(state.connector.capabilities).be.eql(_capabilities, "Capabilities should not be changed");
        should(_.intersection(Object.keys(state.connector), _methods).length).be.equal(_methods.length);
    });


    it("should fetch schema and create models from it", () => {
        const _schemaMethods = [
            'fetchSchema',
            'createModelsFromSchema'
        ];
        should(_.intersection(Object.keys(state.connector), _schemaMethods).length).be.equal(_schemaMethods.length);
    });

    it("should be started", () => {
        should(state.connector.started).be.ok();
        should(state.connector.enabled).be.ok();
    });

    it("should register Model with application", () => {
        should(Arrow.Model.getModel('appc.loki.js/users')).be.ok();
    });

});
//Integration
// - should throw on wrong config