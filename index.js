var path = require('path');
var join = path.join;
var fs = require('fs');

/**
 * @implements {ZBPlatform}
 * @constructor
 */
PlatformTVIP = function () {};

PlatformTVIP.prototype.getName = function () {
	return 'tvip';
};

/** @inheritDoc */
PlatformTVIP.prototype.getPublicDir = function () {
	return join(__dirname, 'lib');
};

/** @inheritDoc */
PlatformTVIP.prototype.getConfig = function () {
	return {
		"compilation": {
			"externs": [
				join(__dirname, 'typedef', 'tvip-event.js'),
				join(__dirname, 'typedef', 'tvip-player.js'),
				join(__dirname, 'typedef', 'tvip-recorder.js'),
				join(__dirname, 'typedef', 'tvip-stb.js')
			]
		}
	};
};

/** @inheritDoc */
PlatformTVIP.prototype.buildApp = function (zbApp, dir) {
	var buildHelper = zbApp.getBuildHelper();

	return buildHelper.writeIndexHtml(path.join(dir, 'index.html'), this.getName())
		.then(function(warnings) {
			buildHelper.copyCustomWebFiles(dir);

			return warnings;
		});
};

module.exports = PlatformTVIP;