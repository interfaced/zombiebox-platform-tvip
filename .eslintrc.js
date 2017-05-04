const path = require('path');
const eslintPluginGoog = require('eslint-plugin-goog');

const knownNamespaces = [
	...eslintPluginGoog.nsUtils.findByPattern(path.join(__dirname , 'node_modules', 'zombiebox', '**', '*.js'))
];

module.exports = {
	'parser': 'espree',
	'ecmaFeatures': {},
	'env': {
		'browser': true,
		'es6': true,
		'node': true
	},
	'globals': {
		'goog': true,
		'zb': true,
		'app': true
	},
	'extends': 'interfaced',
	'plugins': [
		'goog'
	],
	'rules': {
		'goog/no-undeclared-deps': [
			'error', {
				'domains': ['zb'],
				'knownNamespaces': knownNamespaces
			}
		],
		'goog/no-unused-deps': [
			'error', {
				'domains': ['zb']
			}
		],
		'goog/right-order': [
			'error'
		],
		'goog/no-duplicates': [
			'error'
		]
	}
};
