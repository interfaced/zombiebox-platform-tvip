var path = require('path');



/**
 * @implements {ZBPlatform}
 * @constructor
 */
PlatformTVIP = function () {};


/**
 * @inheritDoc
 */
PlatformTVIP.prototype.getName = function () {
	return 'tvip';
};


/**
 * @inheritDoc
 */
PlatformTVIP.prototype.getPublicDir = function () {
	return path.join(__dirname, 'lib');
};


/**
 * @inheritDoc
 */
PlatformTVIP.prototype.getConfig = function () {
	return {
		"compilation": {
			"externs": [
				path.join(__dirname, 'typedef', 'tvip-event.js'),
				path.join(__dirname, 'typedef', 'tvip-player.js'),
				path.join(__dirname, 'typedef', 'tvip-recorder.js'),
				path.join(__dirname, 'typedef', 'tvip-stb.js')
			]
		}
	};
};


/**
 * @inheritDoc
 */
PlatformTVIP.prototype.buildApp = function (zbApp, dir) {
	var buildHelper = zbApp.getBuildHelper();

	return buildHelper.writeIndexHtml(path.join(dir, 'index.html'), this.getName())
		.then(function(warnings) {
			buildHelper.copyCustomWebFiles(dir);

			return warnings;
		});
};

module.exports = PlatformTVIP;