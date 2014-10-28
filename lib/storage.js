/*
 * This file is part of the ZombieBox package.
 *
 * Copyright (c) 2011-2013, Interfaced
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
zb.device.platforms.tvip.Storage = function(tvipStb) {
	this._tvipStb = tvipStb;
	this._prefix = '';
};


/** @inheritDoc */
zb.device.platforms.tvip.Storage.prototype.setKeyPrefix = function(prefix) {
	this._prefix = prefix;
};


/** @inheritDoc */
zb.device.platforms.tvip.Storage.prototype.getItem = function(key) {
	return this._tvipStb.getEnvValue(this._prefix + key);
};


/** @inheritDoc */
zb.device.platforms.tvip.Storage.prototype.setItem = function(key, value) {
	this._tvipStb.setEnvValue(this._prefix + key, value);
};


/** @inheritDoc */
zb.device.platforms.tvip.Storage.prototype.removeItem = function(key) {
	this._tvipStb.setEnvValue(this._prefix + key, '');
};


/**
 * @type {TVIPStb}
 */
zb.device.platforms.tvip.Storage.prototype._tvipStb;


/**
 * @type {string}
 * @private
 */
zb.device.platforms.tvip.Storage.prototype._prefix;
