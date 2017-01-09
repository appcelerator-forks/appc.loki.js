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
        //init(self);
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

    it("should return proper status code", (next) => {
        var options = {
            "url": urlToHit,
            "method": "GET",
            "auth": auth,
            "json": true
        };

        request(options, function (err, response, body) {
            should(body.success).be.true;
            should(response.statusCode).be.equal(200);
            console.log(body);
            should(typeof body).be.equal('object');
        });

        next();
    });
});
