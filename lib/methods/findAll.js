var Arrow = require('arrow'),
	Query = require('../utils/Query').Query,
	collection = require('../utils/Collection').Collection;

/**
 * Finds all model instances.  A maximum of 1000 models are returned.
 * @param {Arrow.Model} Model The model class being updated.
 * @param {Function} callback Callback passed an Error object (or null if successful) and the models.
 */
exports.findAll = function findAll(Model, callback) {
	var self = Model.getConnector();
	var result = null;
	//Check if collection exists
	var Collection = new collection(Model.plural, self.loki);
	if (Collection.exists()) {
		//And fetch rsult
		var col = Collection.getCollection();
		var criteria = new Query(col);
		result = criteria.find().all();
	} else {
		throw new Error(`Collection "${Model.name}" does not exist`);
	}

	if (result === null) {
		callback(null, {});
	} else {
		var instances = [];
		result.map(function (item, index) {
			var instance = Model.instance(item, true);
			instance.setPrimaryKey(parseInt(item['$loki']));
			instances.push(instance);
		});
		//Call the callback
		callback(null, instances);
	}
};