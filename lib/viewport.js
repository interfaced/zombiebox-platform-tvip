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
	var videoMode = this._getPlatformVideoMode();
	var area = {};
	if(videoMode > this._containerRect.height) {
		Object.keys(screenArea).forEach(function(key) {
			area[key] = screenArea[key] * (1920 / 1280);
		});
	}

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
 * @protected
 */
zb.device.platforms.tvip.ViewPort.prototype._updateVideoInfo = function() {
	var area = this.getCurrentArea();

	this._videoInfo = {
		width: area.width,
		height: area.height
	};
};


/**
 * @type {{stb: TVIPStb, player: TVIPPlayer}}
 * @protected
 */
zb.device.platforms.tvip.ViewPort.prototype._plugin;
