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
goog.require('zb.platform.tvip.consts.player');



/**
 * @param {zb.device.ViewPort.Rect} containerRect
 * @param  {{stb: TVIPStb, player: TVIPPlayer}} plugin
 * @constructor
 * @extends {zb.device.ViewPort}
 * @implements {zb.device.IViewPort}
 */
zb.device.platforms.tvip.ViewPort = class extends zb.device.ViewPort {
	constructor(containerRect, plugin) {
		super(containerRect);

		/**
		 * @type {{stb: TVIPStb, player: TVIPPlayer}}
		 * @protected
		 */
		this._plugin = plugin;


		/**
		 * @type {!Object.<zb.platform.tvip.consts.player.Ratio, zb.device.AspectRatio>}
		 * @protected
		 */
		this._aspectRatioMap;


		/**
		 * @type {number}
		 * @protected
		 */
		this._coefficient = this._getPlatformVideoMode() / containerRect.height;

		this._initAspectRatioMap();
	}

	/**
	 * @override
	 */
	hasFeatureAspectRatio() {
		return true;
	}

	/**
	 * @override
	 */
	isAspectRatioSupported(ratio) {
		return !!this._findRatioInAspectRatioMap(ratio);
	}

	/**
	 * @override
	 */
	updateViewPort() {
		this._setViewPort(this.getCurrentArea());
	}

	/**
	 * @override
	 */
	_setViewPort(screenArea) {
		const area = this._createRect(0, 0, 0, 0);
		const ratio = this._findRatioInAspectRatioMap(this._aspectRatio);

		Object.keys(screenArea).forEach(function (key) {
			area[key] = Math.floor(screenArea[key] * this._coefficient);
		}, this);

		this._plugin.player.setVideoWindow(area.x, area.y, area.width, area.height, false);

		if (ratio) {
			this._plugin.player.setAspectRatio(ratio);
		}
	}

	/**
	 * @return {number}
	 * @protected
	 */
	_getPlatformVideoMode() {
		return parseInt(this._plugin.stb.getDisplayMode(), 10);
	}

	/**
	 * @protected
	 */
	_initAspectRatioMap() {
		const Proportion = zb.device.AspectRatio.Proportion;
		const Transferring = zb.device.AspectRatio.Transferring;
		const TVIPRatio = zb.platform.tvip.consts.player.Ratio;

		this._aspectRatioMap = {};

		const createAspectRatio = (proportion, transferring) => new zb.device.AspectRatio(proportion, transferring);

		this._aspectRatioMap[TVIPRatio.NORMAL] = createAspectRatio(Proportion.AUTO, Transferring.AUTO);
		this._aspectRatioMap[TVIPRatio.FULL] = createAspectRatio(Proportion.AUTO, Transferring.STRETCH);
		this._aspectRatioMap[TVIPRatio.ZOOM] = createAspectRatio(Proportion.AUTO, Transferring.CROP);
	}

	/**
	 * @param {zb.device.AspectRatio} ratio
	 * @return {?zb.platform.tvip.consts.player.Ratio}
	 * @protected
	 */
	_findRatioInAspectRatioMap(ratio) {
		const supportedRatios = /** @type {Array.<zb.platform.tvip.consts.player.Ratio>} */ (Object.keys(this._aspectRatioMap));

		return supportedRatios.filter(function (platformRatio) {
				return ratio.eq(this._aspectRatioMap[platformRatio]);
			}, this)[0] || null;
	}
};
