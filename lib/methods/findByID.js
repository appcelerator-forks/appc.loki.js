var Arrow = require('arrow'),
    Query = require('../utils/Query').Query,
    collection = require('../utils/Collection').Collection;

/**
 * Finds a model instance using the primary key.
 * @param {Arrow.Model} Model The model class being updated.
 * @param {String} id ID of the model to find.
 * @param {Function} callback Callback passed an Error object (or null if successful) and the found model.
 */
exports.findByID = function(Model, id, callback) {
    var self = Model.getConnector();
    var result = null;
    if (!id) {
        return callback(new Error('Missing required "id"'));
    }
    //Check if collection exists
    var Collection = new collection(Model.plural, self.loki);
    if (Collection.exists()) {
        //And fetch rsult
        var col = Collection.getCollection();
        var criteria = new Query(col);
        result = criteria.find(parseInt(id)).one();
    } else {
        throw new Error(`Collection "${Model.name}" does not exist`);
    }

    if (result === null) {
        callback(null, {});
    } else {
        var instance = Model.instance(result, true);
        instance.setPrimaryKey(parseInt(result['$loki']));
        callback(null, instance);
    }
};
