/*
 * This file is part of the ZombieBox package.
 *
 * Copyright (c) 2011-2016, Interfaced
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
goog.provide('zb.device.platforms.tvip.ViewPort');
goog.require('tvip.consts');
goog.require('zb.device.AspectRatio');
goog.require('zb.device.ViewPort');



/**
 * @param {zb.device.ViewPort.Rect} containerRect
 * @param  {{stb: TVIPStb, player: TVIPPlayer}} plugin
 * @constructor
 * @extends {zb.device.ViewPort}
 * @implements {zb.device.IViewPort}
 */
zb.device.platforms.tvip.ViewPort = function(containerRect, plugin) {
	this._plugin = plugin;
	this._coefficient = this._getPlatformVideoMode() / containerRect.height;
	this._initAspectRatioMap();

	goog.base(this, containerRect);
};
goog.inherits(zb.device.platforms.tvip.ViewPort, zb.device.ViewPort);


/**
 * @override
 */
zb.device.platforms.tvip.ViewPort.prototype.hasFeatureAspectRatio = function() {
	return true;
};


/**
 * @override
 */
zb.device.platforms.tvip.ViewPort.prototype.isAspectRatioSupported = function(ratio) {
	return !!this._findRatioInAspectRatioMap(ratio);
};


/**
 * @override
 */
zb.device.platforms.tvip.ViewPort.prototype.updateViewPort = function() {
	this._setViewPort(this.getCurrentArea());
};


/**
 * @override
 */
zb.device.platforms.tvip.ViewPort.prototype._setViewPort = function(screenArea) {
	var area = this._createRect(0, 0, 0, 0);
	var ratio = this._findRatioInAspectRatioMap(this._aspectRatio);

	Object.keys(screenArea).forEach(function(key) {
		area[key] = Math.floor(screenArea[key] * this._coefficient);
	}, this);

	this._plugin.player.setVideoWindow(area.x, area.y, area.width, area.height, false);

	if (ratio) {
		this._plugin.player.setAspectRatio(
			/** @type {tvip.consts.TVIPPlayer.Ratio} */(ratio)
		);
	}
};


/**
 * @return {number}
 * @protected
 */
zb.device.platforms.tvip.ViewPort.prototype._getPlatformVideoMode = function() {
	return parseInt(this._plugin.stb.getDisplayMode(), 10);
};


/**
 * @protected
 */
zb.device.platforms.tvip.ViewPort.prototype._initAspectRatioMap = function() {
	var Proportion = zb.device.AspectRatio.Proportion;
	var Transferring = zb.device.AspectRatio.Transferring;
	var TVIPRatio = tvip.consts.TVIPPlayer.Ratio;

	this._aspectRatioMap = {};

	var createAspectRatio = function(proportion, transferring) {
		return new zb.device.AspectRatio(proportion, transferring);
	};

	this._aspectRatioMap[TVIPRatio.NORMAL] = createAspectRatio(Proportion.AUTO, Transferring.AUTO);
	this._aspectRatioMap[TVIPRatio.FULL] = createAspectRatio(Proportion.AUTO, Transferring.STRETCH);
	this._aspectRatioMap[TVIPRatio.ZOOM] = createAspectRatio(Proportion.AUTO, Transferring.CROP);
};


/**
 * @param {zb.device.AspectRatio} ratio
 * @return {?tvip.consts.TVIPPlayer.Ratio}
 * @protected
 */
zb.device.platforms.tvip.ViewPort.prototype._findRatioInAspectRatioMap = function(ratio) {
	var supportedRatios = /** @type {Array.<tvip.consts.TVIPPlayer.Ratio>} */ (Object.keys(this._aspectRatioMap));

	return supportedRatios.filter(function(platformRatio) {
			return ratio.eq(this._aspectRatioMap[platformRatio]);
		}, this)[0] || null;
};


/**
 * @type {{stb: TVIPStb, player: TVIPPlayer}}
 * @protected
 */
zb.device.platforms.tvip.ViewPort.prototype._plugin;


/**
 * @type {!Object.<tvip.consts.TVIPPlayer.Ratio, zb.device.AspectRatio>}
 * @protected
 */
zb.device.platforms.tvip.ViewPort.prototype._aspectRatioMap;


/**
 * @type {number}
 * @protected
 */
zb.device.platforms.tvip.ViewPort.prototype._coefficient;
