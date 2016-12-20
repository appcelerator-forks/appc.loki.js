var Arrow = require('Arrow'),
	Query = require('../utils/Query').Query,
	collection = require('../utils/Collection').Collection;

/**
 * Performs a query and returns a distinct result set based on the field(s).
 * @param {Arrow.Model} Model Model class to check.
 * @param {String} field Comma-separated list of fields.
 * @param {ArrowQueryOptions} [options] Query options.
 * @param {Function} callback Callback passed an Error object (or null if successful) and the distinct values array.
 */
exports.distinct = function distinct(Model, field, options, callback) {
	var self = Model.getConnector();
	var result = null;
	var query = {
		where: options.where || null,
		order: Model.translateKeysForPayload(options.order),
		skip: options.skip,
		limit: options.limit
	};
	//Check if collection exists
	var Collection = new collection(Model.plural, self.loki);
	if (Collection.exists()) {
		//And fetch rsult
		var col = Collection.getCollection();
		var criteria = new Query(col);
		result = criteria
			.find()
			.where(query.where)
			.distinct(field);
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
