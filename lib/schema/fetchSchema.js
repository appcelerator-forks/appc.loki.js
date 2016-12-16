var Arrow = require('arrow'),
	Schema = require('../utils/Schema').Schema;

/**
 * Fetches the schema for your connector.
 *
 * For example, your schema could look something like this:
 * {
 *     objects: {
 *         person: {
 *             first_name: {
 *                 type: 'string',
 *                 required: true
 *             },
 *             last_name: {
 *                 type: 'string',
 *                 required: false
 *             },
 *             age: {
 *                 type: 'number',
 *                 required: false
 *             }
 *         }
 *     }
 * }
 *
 * @param next
 * @returns {*}
 */
exports.fetchSchema = function (next) {
	var self = this;
	var _schema = new Schema(self.loki.database.collections);
	// If we already have the schema, just return it.
	if (this.metadata.schema) {
		return next(null, this.metadata.schema);
	}
	//Create the schema
	_schema.createSchema();
	//Pass it forward
	var objects = _schema.getSchema();
	return next(null, objects);
};
