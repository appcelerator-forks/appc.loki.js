// /* global init, assertFailure, dump, state */
// 'use strict';

// require('../_init');

// var should = require('should'),
//     _ = require('underscore'),
//     Arrow = require('Arrow');

// describe('Connector CREATE and UPDATE', () => {
//     var self = this;
//     var _id;

//     it("should be able to create objects", (next) => {
//         let model = Arrow.Model.getModel('appc.loki.js/users');
//         const newModel = {
//             name: 'Fiodor Zaiuchuk',
//             weapons: "['ram']",
//             Age: "44"
//         };
//         model.create(newModel, (err, resp) => {
//             console.log('Resp :::: ', resp);
//             let modelInstance = model.delete(resp, (error, object) => {
//                 console.log('Deleted >>>', object);
//                 next();
//             });
//         });
//         const _model = Arrow.Model.getModel('appc.loki.js/users');
//         const newModel = {
//             name: 'Fiodor Zaiuchuk',
//             weapons: "['ram']",
//             Age: "44"
//         };
//         let __model = Arrow.Model.getModel('appc.loki.js/users');
//         //create a new model
//         __model.create(newModel, (_error, _instance) => {
//             var __instance = _instance.toPayload();

//             should(_error).be.not.ok;
//             should(__instance).be.ok;
//             _id = _instance.getPrimaryKey();
//             should(_instance.getPrimaryKey()).be.a.String;
//             //Delete existing record
//             const _model = Arrow.Model.getModel('appc.loki.js/users');
//             _model.delete(_id, (err, resp) => {
//                 should(err).not.be.ok;
//                 _model.findByID(_id, (err, resp) => {
//                     should(err).be.ok;
//                     next();
//                 });
//             });
//         });
//     });

// });