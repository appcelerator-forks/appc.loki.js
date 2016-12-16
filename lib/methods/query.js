// TODO: Reference the module to connect to your data store.
var yourDataStore = /*require('your-data-store')*/{},
	Arrow = require('arrow'),
	_ = require('lodash');

var Query = require('../utils/Query').Query,
	collection = require('../utils/Collection').Collection;

/**
 * Queries for particular model records.
 * @param {Arrow.Model} Model The model class being updated.
 * @param {ArrowQueryOptions} options Query options.
 * @param {Function} callback Callback passed an Error object (or null if successful) and the model records.
 * @throws {Error} Failed to parse query options.
 */
exports.query = function (Model, options, callback) {
	// TODO: Translate the Arrow style query fields below to line up with your data store.
	var query = {
		/**
		 * A dictionary of fields to search by, ignoring keys that aren't specified in our model, and including "id",
		 * such as { first_name: 'Daws%', last_name: 'Toth' }
		 */
		where: options.where || null,
		/**
		 * A dictionary of fields to order by, with a direction, such as { first_name: 1, last_name: -1 } where 1 is
		 * ascending and -1 is descending.
		 */
		order: Model.translateKeysForPayload(options.order),
		/**
		 * A number indicating how far to skip through the results before returning them, such as 0 or 100, as well
		 * as a limit on how many to return, such as 10 or 20. Alternatively, use options.page and options.per_page.
		 * Arrow translates these for you.
		 *
		 * For example, a skip of 50 and a limit of 10 is equivalent to a page of 5 and a per_page of 10.
		 */
		skip: options.skip,
		limit: options.limit
	};

	var self = Model.getConnector();
	//Check if collection exists
	Collection = new collection(Model.plural, self.loki);
	if (Collection.exists()) {
		//And fetch rsult
		var col = Collection.getCollection();
		var criteria = new Query(col);
		if (query.where !== null) {
			var _criteria = criteria.find().where(query.where);
		} else {
			var _criteria = criteria.find();
		}
		if (query.order)
			_criteria.simplesort(query.order);
		if (query.skip)
			_criteria.offset(query.skip);
		if (query.limit)
			_criteria.limit;
		var result = _criteria.all();
	} else {
		throw new Error(new ORMError(`Collection "${Model.name}" does not exist`));
	}
	if (result === null) {
		callback(null, {});
	} else {
		var instances = new Array();
		result.map(function (item, index) {
			var instance = Model.instance(item, true);
			instance.setPrimaryKey(parseInt(item['$loki']));
			instances.push(instance);
		});
		//Call the callback
		callback(null, instances);
	}

	// TODO: Find the matching results for this Model from your data store. 
	// yourDataStore.query(query, function (err, results) {
	// 	if (err) {
	// 		return callback(err);
	// 	}

	// 	// TODO: Instantiate each result.
	// 	var array = [];
	// 	for (var c = 0; c < results.length; c++) {
	// 		var instance = Model.instance(results[c], true);
	// 		instance.setPrimaryKey(String(results[c].id));
	// 		array.push(instance);
	// 	}
	// 	// TODO: Turn the array of instances in to a collection.
	// 	callback(null, new Arrow.Collection(Model, array));
	// });
};
