/* global init, assertFailure, dump, state */

'use strict';

require('../_init');

var should = require('should'),
    _ = require('underscore'),
    Arrow = require('arrow'),
    request = require('request');

describe('FindByID Api tests', () => {
    var self = this;
    init(self);

    var auth,
        connector,
        server,
        urlToHit;

    before(function (next) {
        auth = {
            user: this.server.config.apikey,
            password: ''
        };
        connector = this.connector;
        connector.config.requireSessionLogin = true;
        server = new Arrow();
        urlToHit = 'http://localhost:' + server.port + `/api/appc.loki.js/users/`;
        next();
    });

    after(function () {
        urlToHit = 'http://localhost:' + server.port + `/api/appc.loki.js/users/`;
    });

    it("should find object by ID", (next, id = 1) => {
        let options = {
            "url": urlToHit + id,
            "method": "GET",
            "auth": auth,
            "json": true
        };
        let expectedData = ['Age', 'name', 'weapons'];

        request(options, function (err, response, body) {
            let resData = body.user;

            should(body.success).be.true();
            should(err).be.not.ok;
            should(response.statusCode).be.equal(200);

            expectedData.forEach((item) => {
                should(resData.hasOwnProperty(item)).be.true("Expected '" + item + "' to be a part of this list!");
            });
            next();
        });
    });

    it("should NOT return data with invalid ID", (next, id = 27) => {
        let options = {
            "url": urlToHit + id,
            "method": "GET",
            "auth": auth,
            "json": true
        };

        let expectedProperties = ['id', 'name', 'weapons', 'Age'];

        request(options, function (err, response, body) {
            should(body.success).be.true;
            should(response.statusCode).be.equal(200);
            should(err).be.not.ok;
            // Response data should be an empty array when invalid ID is passed
            should(_.isEmpty(body.user)).be.true();
            next();
        });
    });
});
