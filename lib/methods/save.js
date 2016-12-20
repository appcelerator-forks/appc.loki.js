var Persist = require('../utils/Persist').Persist,
	collection = require('../utils/Collection').Collection;
/**
 * Updates a Model instance.
 * @param {Arrow.Model} Model The model class being updated.
 * @param {Arrow.Instance} instance Model instance to update.
 * @param {Function} callback Callback passed an Error object (or null if successful) and the updated model.
 */
exports.save = function (Model, instance, callback) {
	var payload = instance.toPayload(); // "payload" is the translated raw values, based on field names.
	var self = Model.getConnector();
	var Collection = new collection(Model.plural, self.loki);

	if (Collection.exists()) {
		var persist = new Persist(Collection);
		var result = persist.upsert(instance.getPrimaryKey(), payload);
		var _instance = Model.instance(result, true);
		_instance.setPrimaryKey(String(result['$loki'])); // Note: the primary key can be a number, too.
		callback(null, _instance);
	} else {
		callback('Collection '+Model.plural+' could not be persisted!');
	}
};
