/* global init, assertFailure, dump, state */

'use strict';

require('../_init');

var should = require('should'),
    _ = require('underscore'),
    Arrow = require('Arrow'),
    request = require('request');

describe('Query Api tests', () => {
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
        urlToHit = 'http://localhost:' + server.port + `/api/appc.loki.js/users/query?`;
        next();
    });

    it("should return proper response when request is made with valid query parameters", (next) => {
        let options = {
            "url": urlToHit + 'where={"$gt":{"Age":"20"}}',
            "method": "GET",
            "auth": auth,
            "json": true
        };

        request(options, function (err, response, body) {
            should(body.success).be.true();
            should(err).be.not.ok;
            should(response.statusCode).be.equal(200);
            next();
        });
    });

    it("should return every object with valid name based on query params", (next) => {
        let options = {
            "url": urlToHit + 'where={"$contains":{"name":"Gunar"}}',
            "method": "GET",
            "auth": auth,
            "json": true
        };

        request(options, function (err, response, body) {
            let users = body.users;

            should(body.success).be.true();
            should(response.statusCode).be.equal(200);

            users.forEach(function (user) {
                should(user.name.includes("Gunar")).be.true();
            }, this);
            next();
        });
    });

    it("should return proper response based on query parameters", (next) => {
        let options = {
            // should get every user with name containing letter "G" and age > 30
            "url": urlToHit + 'where={"$contains":{"name":"G" },"$gt":{"Age":"30" }}',
            "method": "GET",
            "auth": auth,
            "json": true
        };

        request(options, function (err, response, body) {
            let users = body.users;

            should(body.success).be.true();
            should(response.statusCode).be.equal(200);

            users.forEach(function (user) {
                // checks if name contains the letter "G" passed in query params 
                should(user.name.indexOf("G") > -1).be.true();
                should(user.Age > 30).be.true();
            }, this);
            next();
        });
    });

    it("should not work with unsupported query commands", (next) => {
        let options = {
            "url": urlToHit + 'skip=1&where={"name": "3","Age": "23"}',
            "method": "GET",
            "auth": auth,
            "json": true
        };

        request(options, function (err, response, body) {
            // Gets unsupported command name in where parameter
            var msg = body.message.match(/\'(.*?)\'/);

            should(body.message).be.equal("Unsupported command: \'" + msg[1] + "\'!");
            should(body.success).be.false();
            should(response.statusCode).be.equal(500);
            next();
        });
    });

    it("should not allow you to request endpoint if not authorised", (next) => {
        let options = {
            // should get every user with name containing letter "G" and age > 30
            "url": urlToHit + 'where={"$contains":{"name":"G" },"$gt":{"Age":"30" }}',
            "method": "GET",
            "json": true
        };

        request(options, function (err, response, body) {

            should(body.success).be.false();
            should(body.message).be.equal('Unauthorized');
            should(response.statusCode).be.equal(401);
            next();
        });
    });
});
