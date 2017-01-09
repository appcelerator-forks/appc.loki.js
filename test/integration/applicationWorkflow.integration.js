/* global init, assertFailure, dump, state */

'use strict';

require('../_init');

var should = require('should'),
    _ = require('underscore'),
    Arrow = require('Arrow'),
    request = require('request');

describe('Endpoint findAll', () => {
    var self = this;
    init(self);

    var auth,
        connector,
        server,
        urlToHit;

    beforeEach(function (next) {
        auth = {
            user: this.server.config.apikey,
            password: ''
        };
        connector = this.connector;
        //server = this.server;
        connector.config.requireSessionLogin = true;
        server = new Arrow();
        urlToHit = 'http://localhost:' + server.port + '/api/appc.loki.js/users';
        next();
    });

    it('should go through with auth alright', (next) => {
        request({
            method: 'GET',
            uri: urlToHit,
            auth: auth,
            json: true
        }, function (err, response, body) {
            console.log(body);
            should(body.success).be.true;
            next();
        });
    });

    it('should make sure auth is required', (next) => {
        request({
            method: 'GET',
            uri: urlToHit,
            json: true
        }, function (err, response, body) {
            should(body.success).be.equal(false);
            should(body.message).containEql('Unauthorized');
            next();
        });
    });

    it('should have proper server instantiation', (next) => {
        console.log(Object.getOwnPropertyNames(server));

        request({
            method: 'GET',
            uri: urlToHit,
            json: true
        }, function (err, response, body) {

            next();
        });
    });
});
