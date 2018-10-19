goog.provide('zb.device.platforms.tvip.Info');
goog.require('zb.device.AbstractInfo');
goog.require('zb.device.Resolution');
goog.require('zb.device.errors.UnsupportedFeature');


/**
 */
zb.device.platforms.tvip.Info = class extends zb.device.AbstractInfo {
	/**
	 * @param {TVIPStb} tvipStb
	 */
	constructor(tvipStb) {
		super();


		/**
		 * @type {TVIPStb}
		 * @protected
		 */
		this._tvipStb = tvipStb;
	}

	/**
	 * @override
	 */
	type() {
		return 'tvip';
	}

	/**
	 * @override
	 */
	version() {
		throw new zb.device.errors.UnsupportedFeature('Version getting');
	}

	/**
	 * @override
	 */
	manufacturer() {
		return 'TVIP';
	}

	/**
	 * @override
	 */
	model() {
		throw new zb.device.errors.UnsupportedFeature('Model getting');
	}

	/**
	 * @override
	 */
	serialNumber() {
		throw new zb.device.errors.UnsupportedFeature('Serial number getting');
	}

	/**
	 * @override
	 */
	softwareVersion() {
		return this._tvipStb.getApiVersion().toString();
	}

	/**
	 * @override
	 */
	hardwareVersion() {
		throw new zb.device.errors.UnsupportedFeature('Hardware version getting');
	}

	/**
	 * @override
	 */
	osdResolutionType() {
		const resolutions = this._getResolutionsByScreenSize(window.outerWidth, window.outerHeight);

		return resolutions[0] || zb.device.Resolution.HD;
	}

	/**
	 * @override
	 */
	_getLocale() {
		return this._tvipStb.getCurrentLanguageCode();
	}
};
