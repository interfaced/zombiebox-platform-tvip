const path = require('path');
const {nsUtils} = require('eslint-plugin-goog');

module.exports = {
	extends: 'interfaced/zombiebox',
	settings: {
		knownNamespaces: [
			...nsUtils.findByPattern(path.join(__dirname , 'lib', '**', '*.js')),
			...nsUtils.findByPattern(path.join(__dirname , 'node_modules', 'zombiebox', '**', '*.js'))
		]
	}
};
