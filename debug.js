/**
 * NOTE: This file is simply for testing this connector and will not
 * be used or packaged with the actual connector when published.
 */
var async = require('async'),
	path = require('path');
var installBin = '/Users/marinvasilev/.appcelerator/install/5.5.1/package/bin/appc';
var env = process.env;
//Load global modules
env.NODE_PATH = path.resolve(path.join(path.dirname(installBin), '..', 'node_modules')) + path.delimiter +
	// and then our global cache directory
	path.join('/Users/marinvasilev/.appcelerator/cache', 'node_modules') + path.delimiter +
	// then pickup any paths already setup in our env
	(env.NODE_PATH || '');
var app_config = require('./conf/default');
//Modify log level
// app_config.logLevel = 'trace';
// And finally run arrow
var Arrow = require('arrow'),
	server = new Arrow();

server.start();


server.on('started', () => {
	console.log('Started');
});