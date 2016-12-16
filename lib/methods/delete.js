var Persist = require('../utils/Persist').Persist,
	collection = require('../utils/Collection').Collection;

/**
 * Deletes the model instance.
 * @param {Arrow.Model} Model The model class being updated.
 * @param {Arrow.Instance} instance Model instance.
 * @param {Function} callback Callback passed an Error object (or null if successful), and the deleted model.
 */
exports['delete'] = function (Model, instance, callback) {
	var id = instance.getPrimaryKey();
	var self = Model.getConnector();
	var Collection = new collection(Model.plural, self.loki);

	if (Collection.exists()) {
		var persist = new Persist(Collection);
		var result = persist.remove(instance.getPrimaryKey());
		var instance = Model.instance(result, true);
		instance.setPrimaryKey(String(result['$loki'])); // Note: the primary key can be a number, too.
		callback(null, instance);
	} else {
		callback('Collection ' + Model.plural + ' could not be persisted!');
	}
};
