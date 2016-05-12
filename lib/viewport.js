/*
 * This file is part of the ZombieBox package.
 *
 * Copyright (c) 2011-2016, Interfaced
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
goog.provide('zb.device.platforms.tvip.ViewPort');
goog.require('zb.device.AspectRatio');
goog.require('zb.device.ViewPort');



/**
 * ViewPort object abstraction
 * @param {HTMLElement} videoContainer
 * @param  {{stb: TVIPStb, player: TVIPPlayer}} plugin
 * @extends {zb.device.ViewPort}
 * @constructor
 */
zb.device.platforms.tvip.ViewPort = function(videoContainer, plugin) {
	this._plugin = plugin;
	this._coefficient = this._getPlatformVideoMode() / videoContainer.offsetHeight;
	goog.base(this, videoContainer);
};
goog.inherits(zb.device.platforms.tvip.ViewPort, zb.device.ViewPort);


/**
 * @override
 */
zb.device.platforms.tvip.ViewPort.prototype.hasFeatureAspectRatio = function() {
	return false;
};


/**
 * @override
 */
zb.device.platforms.tvip.ViewPort.prototype.isAspectRatioSupported = function(ratio) {
	return false;
};


/**
 * @override
 */
zb.device.platforms.tvip.ViewPort.prototype.updateViewPort = function() {
	this._setViewPort(this.getCurrentArea());
};


/**
 * @param {zb.device.ViewPort.Rect} screenArea
 * @protected
 */
zb.device.platforms.tvip.ViewPort.prototype._setViewPort = function(screenArea) {
	var area = {};
	var coefficient = this._coefficient;

	Object.keys(screenArea).forEach(function(key) {
		area[key] = screenArea[key] * coefficient;
	});

	this._plugin.player.setVideoWindow(area.x, area.y, area.width, area.height, false);
};


/**
 * @return {number}
 * @protected
 */
zb.device.platforms.tvip.ViewPort.prototype._getPlatformVideoMode = function() {
	return parseInt(this._plugin.stb.getDisplayMode(), 10);
};


/**
 * @type {{stb: TVIPStb, player: TVIPPlayer}}
 * @protected
 */
zb.device.platforms.tvip.ViewPort.prototype._plugin;


/**
 * @type {number}
 * @protected
 */
zb.device.platforms.tvip.ViewPort.prototype._coefficient;
