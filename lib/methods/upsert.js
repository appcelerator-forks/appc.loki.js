var Query = require('../utils/Persist').Persist,
	collection = require('../utils/Collection').Collection;
/**
 * Updates a model or creates the model if it cannot be found.
 * @param {Arrow.Model} Model The model class being updated.
 * @param {String} id ID of the model to update.
 * @param {Object} doc Model attributes to set.
 * @param {Function} callback Callback passed an Error object (or null if successful) and the updated or new model.
 */
exports.upsert = function upsert(Model, id, doc, callback) {
	var self = Model.getConnector();
	Collection = new collection(Model.plural, self.loki);
	if (Collection.exists()) {
		var _colection = Collection.getCollection();
		var persist = new Persist(_colection);
		persist.upsert(id, doc);
		callback(null, []);
	}else{

	}
};
