// /* global init, assertFailure, dump, state */
// 'use strict';

// require('../_init');

// var should = require('should'),
//     request = require('request'),
//     Arrow = require('Arrow');

// describe('Create Api tests', (done) => {
//     init(this);
//     var auth,
//         connector,
//         server,
//         urlToHit,
//         location,
//         options,
//         formData = { name: 'createTest', weapons: 'createWeapon', Age: '45' };

//     before(function (next) {
//         auth = {
//             user: this.server.config.apikey,
//             password: ''
//         };
//         connector = this.connector;
//         server = new Arrow();
//         connector.config.requireSessionLogin = true;
//         urlToHit = 'http://localhost:' + server.port + '/api/appc.loki.js/users';
//         options = {
//             "url": urlToHit,
//             "method": "POST",
//             "headers": {
//                 'content-type': 'multipart/form-data'
//             },
//             "formData": formData,
//             "auth": auth,
//             "json": true
//         };
//         next();
//     });

//     after(function (next) {
//         request({
//             "url": 'http://localhost:' + server.port + location,
//             "method": "DELETE",
//             "bodyParams": {},
//             "auth": auth,
//             "json": true
//         }, function (err, response, body) {
//             next();
//         });
//     });

//     describe('Correct data tests', (done) => {
//         it('should create new records', function (next) {
//             request(options, function (err, response, body) {
//                 location = response.headers.location;
//                 should(response.statusCode).be.equal(201);
//                 next();
//             });
//         });

//         it('should save the created record in the database correctly', function (next) {
//             request({
//                 "url": 'http://localhost:' + server.port + location,
//                 "method": "GET",
//                 "auth": auth,
//                 "json": true
//             }, function (err, response, body) {
//                 should(response.statusCode).be.equal(200);
//                 should(body.user.name).be.equal(formData.name);
//                 should(body.user.weapons).be.equal(formData.weapons);
//                 should(body.user.Age).be.equal(formData.Age);
//                 next();
//             });
//         });
//         done;
//     });

//     describe('Incorrect data tests', (done) => {
//         before(function (next) {
//             options = {
//                 "url": urlToHit,
//                 "method": "POST",
//                 "headers": {
//                     'content-type': 'multipart/form-data'
//                 },
//                 "formData": formData,
//                 "json": true
//             };
//             next();
//         });
//         it('should not create records without autorization', function (next) {
//             request(options, function (err, response, body) {
//                 should(response.statusCode).be.equal(401);
//                 next();
//             });
//         });
//         done;
//     });
//     done;
// });