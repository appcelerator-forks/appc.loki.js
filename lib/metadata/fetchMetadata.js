var Arrow = require('arrow');

/**
 * Fetches metadata describing your connector's proper configuration.
 * @param next
 */
exports.fetchMetadata = function fetchMetadata(next) {
	next(null, {
		fields: [
			// TODO: Add a field for each config property and customize the type, name, and description.
			Arrow.Metadata.Text({
				name: 'db',
				description: 'Database name',
				required: true
			}),
			Arrow.Metadata.Text({
				name: 'path',
				description: 'Path to database folder',
				required: true
			}),
			Arrow.Metadata.Text({
				name: 'keepAlive',
				description: 'Whether to keep a socket open to the connection',
				required: false
			})
			// TODO: After defining your fields, try an `appc run` to see it error!
			// TODO: Then, go update your conf/local.js and conf/example.config.js so it passes validation.
		]
	});
};
