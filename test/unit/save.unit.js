// 'use strict';

// require('../_init');

// var should = require('should'),
//     _ = require('underscore'),
//     Arrow = require('Arrow');

// describe('Connector save', () => {

//     var _id;

//     it("should save object", (next) => {

//         const _model = Arrow.Model.getModel('appc.loki.js/users');
//         const newModel = {
//             name: 'Fiodor Zaiuchuk',
//             weapons: "['ram']",
//             Age: "44"
//         };

//         var _instance = _model.instance(newModel);
//         _model.save(_instance, (err, resp) => {
//             should(err).not.be.ok;
//             should(resp).be.ok;
//             _id = resp.getPrimaryKey();
//             next();
//         });
//     });

//     it("should remove the object", (next) => {
//         const _model = Arrow.Model.getModel('appc.loki.js/users');
//         _model.delete(_id, (err, resp) => {
//             should(err).not.be.ok;
//             should(resp).be.ok;
//             next();
//         });
//     });
// });