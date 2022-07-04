const path = require('path');
const {AbstractPlatform} = require('zombiebox');


/**
 * @implements {ZBPlatform}
 */
class PlatformTVIP extends AbstractPlatform {
	/**
	 * @override
	 */
	getName() {
		return 'tvip';
	}

	/**
	 * @override
	 */
	getSourcesDir() {
		return path.join(__dirname, 'lib');
	}

	/**
	 * @override
	 */
	getConfig() {
		return {
			include: [
				{
					name: 'TVIP APIs',
					externs: [
						path.join(__dirname, 'externs', 'tvip-stb.js')
					]
				}
			]
		};
	}

	/**
	 * @override
	 */
	async buildApp(application, distDir) {
		const buildHelper = application.getBuildHelper();

		const warnings = await buildHelper.writeIndexHTML(path.join(distDir, 'index.html'));
		buildHelper.copyStaticFiles(distDir);

		return warnings;
	}

	/**
	 * @override
	 */
	async pack(application, distDir) {
		// Do nothing, index.html is good enough as PC artifact
	}
}


module.exports = PlatformTVIP;
