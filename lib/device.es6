/*
 * This file is part of the ZombieBox package.
 *
 * Copyright (c) 2011-2016, Interfaced
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
zb.device.platforms.tvip.Device = class extends zb.device.Device {
	constructor() {
		super();


		/**
		 * default value chromo key
		 * @const {number}
		 */
		this.DEFAULT_CHROMA_KEY = 0xFF00FF;//Fuchsia


		/**
		 * @type {zb.device.platforms.tvip.Input}
		 */
		this.input;


		/**
		 * @type {zb.device.platforms.tvip.Info}
		 */
		this.info;


		/**
		 * @type {zb.device.platforms.tvip.Storage}
		 */
		this.storage;


		/**
		 * @type {{
      *     value: number,
      *     isMute: boolean
      * }}
		 * @protected
		 */
		this._volume;


		/**
		 * @type {TVIPStb}
		 */
		this._tvipStb = window['TvipStb'];


		/**
		 * @type {TVIPPlayer}
		 */
		this._tvipPlayer = window['TvipPlayer'];


		/**
		 * @type {TVIPRecorder}
		 */
		this._tvipRecorder = window['TvipRecorder'];


		/**
		 * @type {TVIPEvent}
		 */
		this._tvipEvent = window['TvipEvent'];


		this._tvipStb.reset();
		this._tvipPlayer.reset();//if app was crashed it stop playing
		this._tvipStb.setColorKey(this.DEFAULT_CHROMA_KEY);
	}

	/** @override */
	init() {
		this.info = new zb.device.platforms.tvip.Info(this._tvipStb);
		this.input = new zb.device.platforms.tvip.Input;
		this.storage = new zb.device.platforms.tvip.Storage(this._tvipStb);

		this._fireEvent(this.EVENT_READY);
	}

	/** @override */
	createVideo() {
		return new zb.device.platforms.tvip.Video(this._tvipPlayer, this._tvipEvent);
	}

	/** @override */
	exit() {
		location.href = 'about:back';
	}

	/** @override */
	hasOSDAlphaBlendingFeature() {
		return true;
	}

	/** @override */
	hasOSDChromaKeyFeature() {
		return true;
	}

	/** @override */
	getIP() {
		return '127.0.0.1';
	}

	/** @override */
	getMAC() {
		return this._tvipStb.getMainMacAddress();
	}

	/**
	 * @return {TVIPStb}
	 */
	getStbObject() {
		return this._tvipStb;
	}

	/**
	 * @return {boolean}
	 */
	static detect() {
		const result = /TVIP/.test(navigator.userAgent);
		zb.console.debug('detect tvip', result ? 'true' : 'false', navigator.userAgent);
		return result;
	}
};
