/*
 * This file is part of the ZombieBox package.
 *
 * Copyright (c) 2011-2013, Interfaced
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
zb.device.platforms.tvip.Info = function (tvipStb) {
	goog.base(this);
	this._tvipStb = tvipStb;
};
goog.inherits(zb.device.platforms.tvip.Info, zb.device.Info);


/** @inheritDoc */
zb.device.platforms.tvip.Info.prototype.type = function () {
	return 'tvip';
};


/** @inheritDoc */
zb.device.platforms.tvip.Info.prototype.version = function () {
	return '1.0';
};


/** @inheritDoc */
zb.device.platforms.tvip.Info.prototype.manufacturer = function () {
	return 'TVIP';
};


/** @inheritDoc */
zb.device.platforms.tvip.Info.prototype.model = function () {
	return 'N/A';
};


/** @inheritDoc */
zb.device.platforms.tvip.Info.prototype.serialNumber = function () {
	return 'N/A';
};


/** @inheritDoc */
zb.device.platforms.tvip.Info.prototype.softwareVersion = function () {
	return this._tvipStb.getApiVersion();
};


/** @inheritDoc */
zb.device.platforms.tvip.Info.prototype.hardwareVersion = function () {
	return '1.0';
};


/** @inheritDoc */
zb.device.platforms.tvip.Info.prototype.osdResolutionType = function () {
	if (window.outerWidth >= 1920 && window.outerHeight >= 1080) {
		return zb.device.Resolution.FULL_HD;
	} else if (window.outerWidth >= 1280 && window.outerHeight >= 720) {
		return zb.device.Resolution.HD;
	} else {
		return zb.device.Resolution.PAL;
	}
};


/**
 * @type {TVIPStb}
 * @public
 */
zb.device.platforms.tvip.Info.prototype._tvipStb;
