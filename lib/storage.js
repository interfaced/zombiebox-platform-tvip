goog.provide('zb.device.platforms.tvip.Storage');
goog.require('zb.device.IStorage');


/**
 * @implements {zb.device.IStorage}
 */
zb.device.platforms.tvip.Storage = class {
	/**
	 * @param {TVIPStb} tvipStb
	 */
	constructor(tvipStb) {
		/**
		 * @type {TVIPStb}
		 * @protected
		 */
		this._tvipStb = tvipStb;

		/**
		 * @type {string}
		 * @private
		 */
		this._prefix = '';
	}

	/**
	 * @override
	 */
	setKeyPrefix(prefix) {
		this._prefix = prefix;
	}

	/**
	 * @override
	 */
	getItem(key) {
		return this._tvipStb.getEnvValue(this._prefix + key);
	}

	/**
	 * @override
	 */
	setItem(key, value) {
		this._tvipStb.setEnvValue(this._prefix + key, value);
	}

	/**
	 * @override
	 */
	removeItem(key) {
		this._tvipStb.setEnvValue(this._prefix + key, '');
	}
};
