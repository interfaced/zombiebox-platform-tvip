/*
 * This file is part of the ZombieBox package.
 *
 * Copyright (c) 2011-2013, Interfaced
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
goog.provide('zb.device.platforms.tvip.Device');
goog.require('zb.device.Device');
goog.require('zb.device.platforms.tvip.Info');
goog.require('zb.device.platforms.tvip.Input');
goog.require('zb.device.platforms.tvip.Storage');
goog.require('zb.device.platforms.tvip.Video');



/**
 * @constructor
 * @extends {zb.device.Device}
 * @implements {zb.device.IDevice}
 */
zb.device.platforms.tvip.Device = function() {
	goog.base(this);
	this._tvipStb = window['TvipStb'];
	this._tvipPlayer = window['TvipPlayer'];
	this._tvipRecorder = window['TvipRecorder'];
	this._tvipEvent = window['TvipEvent'];
	this._tvipStb.reset();
	this._tvipPlayer.reset();//if app was crashed it stop playing
	this._tvipStb.setColorKey(this.DEFAULT_CHROMA_KEY);
};
goog.inherits(zb.device.platforms.tvip.Device, zb.device.Device);


/** @inheritDoc */
zb.device.platforms.tvip.Device.prototype.init = function() {
	this.info = new zb.device.platforms.tvip.Info(this._tvipStb);
	this.input = new zb.device.platforms.tvip.Input;
	this.storage = new zb.device.platforms.tvip.Storage(this._tvipStb);

	this._fireEvent(this.EVENT_READY);
};


/** @inheritDoc */
zb.device.platforms.tvip.Device.prototype.createVideo = function() {
	return new zb.device.platforms.tvip.Video(this._tvipPlayer, this._tvipEvent);
};


/** @inheritDoc */
zb.device.platforms.tvip.Device.prototype.exit = function() {
	location.href = 'about:back';
};


/** @inheritDoc */
zb.device.platforms.tvip.Device.prototype.hasOSDAlphaBlendingFeature = function() {
	return true;
};


/** @inheritDoc */
zb.device.platforms.tvip.Device.prototype.hasOSDChromaKeyFeature = function() {
	return true;
};


/** @inheritDoc */
zb.device.platforms.tvip.Device.prototype.getIP = function() {
	return '127.0.0.1';
};


/** @inheritDoc */
zb.device.platforms.tvip.Device.prototype.getMAC = function() {
	return this._tvipStb.getMainMacAddress();
};


/**
 * @type {zb.device.platforms.tvip.Input}
 */
zb.device.platforms.tvip.Device.prototype.input;


/**
 * @type {zb.device.platforms.tvip.Info}
 */
zb.device.platforms.tvip.Device.prototype.info;


/**
 * @type {zb.device.platforms.tvip.Storage}
 */
zb.device.platforms.tvip.Device.prototype.storage;


/**
 * @type {{
 *     value: number,
 *     isMute: boolean
 * }}
 * @private
 */
zb.device.platforms.tvip.Device.prototype._volume;


/**
 * @type {TVIPStb}
 */
zb.device.platforms.tvip.Device.prototype._tvipStb;


/**
 * @type {TVIPPlayer}
 */
zb.device.platforms.tvip.Device.prototype._tvipPlayer;


/**
 * @type {TVIPRecorder}
 */
zb.device.platforms.tvip.Device.prototype._tvipRecorder;


/**
 * @type {TVIPEvent}
 */
zb.device.platforms.tvip.Device.prototype._tvipEvent;


/**
 * default value chromo key
 * @const {number}
 */
zb.device.platforms.tvip.Device.prototype.DEFAULT_CHROMA_KEY = 0xFF00FF;//Fuchsia

/**
 * @return {boolean}
 */
zb.device.platforms.tvip.Device.detect = function() {
	var result = /TVIP/.test(navigator.userAgent);
	zb.console.debug('detect tvip', result ? 'true' : 'false', navigator.userAgent);
	return result;
};

