/*
 * This file is part of the ZombieBox package.
 *
 * Copyright (c) 2011-2016, Interfaced
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
goog.provide('zb.device.platforms.tvip.Info');
goog.require('zb.device.Info');



/**
 * @param {TVIPStb} tvipStb
 * @extends {zb.device.Info}
 * @implements {zb.device.IInfo}
 * @constructor
 */
zb.device.platforms.tvip.Info = class extends zb.device.Info {
	constructor(tvipStb) {
		super();

		/**
		 * @type {TVIPStb}
		 * @public
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
		return 'N/A';
	}

	/**
	 * @override
	 */
	serialNumber() {
		return 'N/A';
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
		} else {
			return zb.device.Resolution.PAL;
		}
	}
};
