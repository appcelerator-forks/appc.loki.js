// /* global init, assertFailure, dump, state */
// 'use strict';

// require('../_init');

// var should = require('should'),
//     _ = require('underscore'),
//     Arrow = require('Arrow');

// describe('Connector CREATE and UPDATE', () => {
//     var self = this;
//     var __instance;

//     it("should be able to create objects", (next) => {
        
//         const _model = Arrow.Model.getModel('appc.loki.js/users');
//         const newModel = {
//             name: 'Fiodor Zaiuchuk',
//             weapons: "['ram']",
//             Age: "44"
//         };
//         let __model = Arrow.Model.getModel('appc.loki.js/users');
//         //create a new model
//         __model.create(newModel, (_error, _instance) => {
//             __instance = _instance.toPayload();

//             should(_error).be.not.ok;
//             should(__instance).be.ok;
//             // should(_instance.getPrimaryKey()).be.a.String;
//             //Delete existing record
//             const _model = Arrow.Model.getModel('appc.loki.js/users');
//             // _model.delete(__instance, (err, resp) => {
//             //     should(err).not.be.ok;
//             //     _model.findByID(__instance.getPrimaryKey(), (err, resp) => {
//             //         should(err).be.ok;
//             //         next();
//             //     });
//             // });
//             __instance = _instance;
//             next();
//         });
//     });

//     it(" ", (next) => {
//         const _model = Arrow.Model.getModel('appc.loki.js/users');
//         _model.delete(__instance, (err, resp) => {
//             should(err).not.be.ok;
//             _model.findByID(resp.getPrimaryKey(), (err, resp) => {
//                 should(err).be.ok;
//                 next();
//                 });
//             });
//     });

// });