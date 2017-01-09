var Arrow = require('arrow'),
    _ = require('lodash');

var Query = require('../utils/Query').Query,
    collection = require('../utils/Collection').Collection;
/**
 * Creates models from your schema (see "fetchSchema" for more information on the schema).
 */
exports.createModelsFromSchema = function () {
    var self = this,
        models = {};
    // TODO: Iterate through the models in your schema.
    Object.keys(self.schema).forEach(function (modelName) {
        var object = self.schema[modelName],
            fields = {};
        object.fields.forEach(function (fieldName) {
            var field = fieldName;//object.fields[fieldName];
            if (fieldName !== 'id') {
                fields[fieldName] = {
                    type: String, //Should do some sort of filed type check
                    required: false //should do some sort of field check, FALSE - since the DB is schema less
                };
            }
        });

        // models[self.name + '/' + modelName] = Arrow.Model.extend(self.name + '/' + modelName, {
        //     name: self.name + '/' + modelName,
        //     autogen: !!self.config.modelAutogen, // Controls if APIs are automatically created for this model.
        //     fields: fields,
        //     connector: self,
        //     generated: true
        // });
        models[self.name + '/' + modelName] = Arrow.Model.extend(self.name + '/' + modelName, _.merge({
            name: self.name + '/' + modelName,
            autogen: !!self.config.modelAutogen, // Controls if APIs are automatically created for this model.
            connector: self,
            generated: true
        }, object));
    });
    self.models = _.defaults(self.models || {}, models);
};
