goog.provide('zb.device.platforms.tvip.Info');
goog.require('zb.device.IInfo');
goog.require('zb.device.Info');
goog.require('zb.device.Resolution');


/**
 * @implements {zb.device.IInfo}
 */
zb.device.platforms.tvip.Info = class extends zb.device.Info {
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
		return '1.0';
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
		return '';
	}

	/**
	 * @override
	 */
	serialNumber() {
		return '';
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
		return '1.0';
	}

	/**
	 * @override
	 */
	osdResolutionType() {
		if (window.outerWidth >= 1920 && window.outerHeight >= 1080) {
			return zb.device.Resolution.FULL_HD;
		} else if (window.outerWidth >= 1280 && window.outerHeight >= 720) {
			return zb.device.Resolution.HD;
		}

		return zb.device.Resolution.PAL;
	}

	/**
	 * @override
	 */
	_getLocale() {
		return this._tvipStb.getCurrentLanguageCode();
	}
};
