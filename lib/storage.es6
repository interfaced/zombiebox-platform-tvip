/*
 * This file is part of the ZombieBox package.
 *
 * Copyright (c) 2011-2016, Interfaced
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
goog.provide('zb.device.platforms.tvip.Storage');
goog.require('zb.device.IStorage');



/**
 * @param {TVIPStb} tvipStb
 * @implements {zb.device.IStorage}
 * @constructor
 */
zb.device.platforms.tvip.Storage = class {
	constructor(tvipStb) {
		/**
		 * @type {TVIPStb}
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
