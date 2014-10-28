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
PlatformTVIP.prototype.buildApp = function (zbApp, dir, callback) {
	var styles = zbApp.getCompressedStyles();
	zbApp.getCompressedScripts(function (stderr, stdout) {
		if (!stdout) {
			console.error('Compilation fail.'.red);
			console.error(stderr.red);
			callback(stderr);
		} else {
			var appCode = zbApp.getIndexHTMLContent({
				inlineScripts: [stdout],
				inlineStyles: [styles]
			});
			console.error(stderr);
			var target = fs.createWriteStream(path.join(dir, 'index.html'));
			target.end(appCode, 'utf-8', function () {

				var customFiles = zbApp.getCustomWebFiles();
				for (var name in customFiles) if (customFiles.hasOwnProperty(name)) {
					var targetPath = join(dir, name);
					var targetDir = path.dirname(targetPath);
					if (!fs.existsSync(targetDir)) {
						zbApp.utils.mkdirP(targetDir);
					}
					zbApp.utils.copy(customFiles[name], targetPath);
				}

				callback();
			}.bind(this));
		}
	}.bind(this), {
		define: [
			'PLATFORM_NAME=\\"' + this.getName() + '\\"'
		]
	});
};

module.exports = PlatformTVIP;