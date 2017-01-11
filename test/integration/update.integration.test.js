/* global init, assertFailure, dump, state */
'use strict';

require('../_init');

var should = require('should'),
    request = require('request'),
    Arrow = require('Arrow');

describe('Update Api tests', (done) => {
    init(this);
    var auth,
        connector,
        server,
        urlToHit,
        location,
        options,
        createData = { name: 'createUser', weapons: 'createWeapon', Age: '30' },
        formData = { name: 'updateTest', weapons: 'updateWeapon', Age: '45' };

    before(function (next) {
        auth = {
            user: this.server.config.apikey,
            password: ''
        };
        connector = this.connector;
        server = new Arrow();
        connector.config.requireSessionLogin = true;
        urlToHit = 'http://localhost:' + server.port;
        options = {
            "url": urlToHit,
            "method": "PUT",
            "headers": {
                'content-type': 'multipart/form-data'
            },
            "formData": formData,
            "auth": auth,
            "json": true
        };
        next();
    });

    after(function (next) {
        request({
            "url": urlToHit + location,
            "method": "DELETE",
            "bodyParams": {},
            "auth": auth,
            "json": true
        }, function (err, response, body) {
            next();
        });
    });

    describe('Correct data tests', (done) => {
        before(function (next) {
            request({
                "url": urlToHit + '/api/appc.loki.js/users',
                "method": "POST",
                "headers": {
                    'content-type': 'multipart/form-data'
                },
                "formData": createData,
                "auth": auth,
                "json": true
            }, function (err, response, body) {
                location = response.headers.location;
                options.url += location;
                next();
            });

        });

        it('should update user by id', function (next) {
            request(options, function (err, response, body) {
                should(response.statusCode).be.equal(204);
                next();
            });
        });

        it('should update the correct record with the correct data', function (next) {
            request({
                "url": urlToHit + location,
                "method": "GET",
                "auth": auth,
                "json": true
            }, function (err, response, body) {
                should(response.statusCode).be.equal(200);
                should(body.user.name).be.equal(formData.name);
                should(body.user.weapons).be.equal(formData.weapons);
                should(body.user.Age).be.equal(formData.Age);
                next();
            });
        });
        done;
    });

    describe('Incorrect data tests', (done) => {
        beforeEach(function (next) {
            options = {
                "url": urlToHit + location,
                "method": "PUT",
                "headers": {
                    'content-type': 'multipart/form-data'
                },
                "formData": formData,
                "auth": auth,
                "json": true
            };
            next();
        });
        it('should not update without authentication', function (next) {
            options.auth = "";
            request(options, function (err, response, body) {
                should(response.statusCode).be.equal(401);
                next();
            });
        });
        it('should not update with the wrong id', function (next) {
            options.url = urlToHit + '/api/appc.loki.js/users/someWrongId';
            request(options, function (err, response, body) {
                should(response.statusCode).be.equal(500);
                next();
            });
        });
        done;
    });
    done;
});