// 'use strict';

// require('../_init');

// var should = require('should'),
//     _ = require('underscore'),
//     Arrow = require('Arrow');

// describe('Connector delete', () => {

//     var _id;

//     before(() => {
//         const _model = Arrow.Model.getModel('appc.loki.js/users');
//         const newModel = {
//             name: 'Fiodor Zaiuchuk',
//             weapons: "['ram']",
//             Age: "44"
//         };
//         _model.create(newModel, (_error, _instance) => {
//             should(_error).be.not.ok;
//             should(_instance).be.ok;
//             _instance = _instance.toPayload();
//             _id = _instance.getPrimaryKey();
//     });
//     });
//     it("should delete objects", (next) => {
//         const _model = Arrow.Model.getModel('appc.loki.js/users');
//         _model.delete(_id, (err, resp) => {
//             should(err).not.be.ok;
//             should(resp).be.ok;

//             _model.findByID(_id, (err, resp) => {
//                 should(err).be.ok;
//                 should(resp).be.not.ok;
//                 next();
//             });
//         });
//     });
// });