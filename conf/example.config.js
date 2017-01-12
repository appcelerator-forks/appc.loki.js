module.exports = {
	connectors: {
		'appc.loki.js': {
			db : 'appc.loki.json',
			path: '/data/',
			lokiConfiguration: {
				autoload : true,
				serializationMethod: 'pretty'
			},
			modelAutogen: true,
			generateModelsFromSchema: true
		}
	}
};