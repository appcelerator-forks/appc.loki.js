var Persist = require('../utils/Persist').Persist,
	collection = require('../utils/Collection').Collection;
/**
 * Creates a new Model or Collection object.
 * @param {Arrow.Model} Model The model class being updated.
 * @param {Array<Object>/Object} [values] Attributes to set on the new model(s).
 * @param {Function} callback Callback passed an Error object (or null if successful), and the new model or collection.
 * @throws {Error}
 */
exports.create = function (Model, values, callback) {
	var _instance = Model.instance(values, false), // ... "instance" is an instance of the Model...
		payload = _instance.toPayload(); // ... and "payload" is the translated raw values, based on field names.

	var self = Model.getConnector();
	var Collection = new collection(Model.plural, self.loki);

	if (Collection.exists()) {
		var persist = new Persist(Collection);
		var result = persist.insert(payload);
		var __instance = Model.instance(result, true);
		__instance.setPrimaryKey(String(result['$loki'])); // Note: the primary key can be a number, too.
		callback(null, __instance);
	} else {
		callback('Collection '+ Model.plural + ' could not be persisted!');
	}
};
