var path = require('path');



/**
 * @implements {ZBPlatform}
 */
class PlatformTVIP {


	/**
	 * @override
	 */
	getName() {
		return 'tvip';
	}


	/**
	 * @override
	 */
	getPublicDir() {
		return path.join(__dirname, 'lib');
	}


	/**
	 * @override
	 */
	getConfig() {
		return {
			"compilation": {
				"externs": [
					path.join(__dirname, 'externs', 'tvip-event.js'),
					path.join(__dirname, 'externs', 'tvip-player.js'),
					path.join(__dirname, 'externs', 'tvip-recorder.js'),
					path.join(__dirname, 'externs', 'tvip-stb.js')
				]
			}
		};
	}


	/**
	 * @override
	 */
	buildApp(zbApp, dir) {
		var buildHelper = zbApp.getBuildHelper();

		return buildHelper.writeIndexHtml(path.join(dir, 'index.html'), this.getName())
			.then(function (warnings) {
				buildHelper.copyCustomWebFiles(dir);

				return warnings;
			});
	}
}

module.exports = PlatformTVIP;