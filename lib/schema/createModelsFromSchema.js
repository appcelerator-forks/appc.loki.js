var Arrow = require('arrow'),
    _ = require('lodash'),
    fs = require('fs');

var Query = require('../utils/Query').Query,
    collection = require('../utils/Collection').Collection;
/**
 * Creates models from your schema (see "fetchSchema" for more information on the schema).
 */
exports.createModelsFromSchema = function () {
    var self = this,
        models = {},
        processPath = process.cwd(),
        modelsDir = processPath + '/models';
    var predefinedModels = [];

    try {
        (fs.readdirSync(modelsDir).map((fileName) => {
            let __model = require(modelsDir + '/' + fileName);
            if (__model) {
                //register models name
                predefinedModels.push(__model.plural);
            }
        }));
    } catch (error) {
        //... Nothing here
    }
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
        if (_.indexOf(predefinedModels, self.name + '/' + modelName) === -1) {
            models[self.name + '/' + modelName] = Arrow.Model.extend(self.name + '/' + modelName, {
                name: self.name + '/' + modelName,
                autogen: !!self.config.modelAutogen, // Controls if APIs are automatically created for this model.
                fields: fields,
                connector: self,
                generated: true,
                visible: true
            });
        }
    });
    self.models = _.defaults(self.models || {}, models);
};
