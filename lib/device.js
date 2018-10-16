goog.provide('zb.device.platforms.tvip.Device');
goog.require('zb.console');
goog.require('zb.device.AbstractDevice');
goog.require('zb.device.errors.UnsupportedFeature');
goog.require('zb.device.platforms.tvip.Info');
goog.require('zb.device.platforms.tvip.Input');
goog.require('zb.device.platforms.tvip.Storage');
goog.require('zb.device.platforms.tvip.Video');
goog.require('zb.http');


/**
 */
zb.device.platforms.tvip.Device = class extends zb.device.AbstractDevice {
	/**
	 * @param {HTMLElement} videoContainer
	 */
	constructor(videoContainer) {
		super();

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
		 * @type {HTMLElement}
		 * @protected
		 */
		this._videoContainer = videoContainer;

		/**
		 * @type {TVIPStb}
		 * @protected
		 */
		this._tvipStb = window['TvipStb'];

		/**
		 * @type {TVIPPlayer}
		 * @protected
		 */
		this._tvipPlayer = window['TvipPlayer'];

		/**
		 * @type {TVIPRecorder}
		 * @protected
		 */
		this._tvipRecorder = window['TvipRecorder'];

		/**
		 * @type {TVIPEvent}
		 * @protected
		 */
		this._tvipEvent = window['TvipEvent'];

		/**
		 * @type {string}
		 * @protected
		 */
		this._chromaColor = '';

		this._tvipStb.reset();
		// If app was crashed it stop playing
		this._tvipPlayer.reset();
	}

	/**
	 * @override
	 */
	init() {
		this.info = new zb.device.platforms.tvip.Info(this._tvipStb);
		this.input = new zb.device.platforms.tvip.Input();
		this.storage = new zb.device.platforms.tvip.Storage(this._tvipStb);

		this._fireEvent(this.EVENT_READY);
	}

	/**
	 * @override
	 */
	getLaunchParams() {
		return zb.http.decodeParams(window.location.search.substring(1));
	}

	/**
	 * @override
	 */
	getEnvironment() {
		throw new zb.device.errors.UnsupportedFeature('Environment getting');
	}

	/**
	 * @override
	 */
	createVideo() {
		return new zb.device.platforms.tvip.Video(
			this._videoContainer,
			this._tvipPlayer,
			this._tvipEvent,
			this._tvipStb
		);
	}

	/**
	 * @override
	 */
	exit() {
		location.href = 'about:back';
	}

	/**
	 * @override
	 */
	isUHDSupported() {
		return false;
	}

	/**
	 * @override
	 */
	hasOSDAlphaBlendingFeature() {
		return true;
	}

	/**
	 * @override
	 */
	hasOSDChromaKeyFeature() {
		return true;
	}

	/**
	 * @override
	 */
	hasOSDOpacityFeature() {
		return false;
	}

	/**
	 * @override
	 */
	setOSDChromaKey(color) {
		this._chromaColor = color;
		this._tvipStb.setColorKey(parseInt('0x' + this._chromaColor, 16));
	}

	/**
	 * @override
	 */
	getOSDChromaKey() {
		return this._chromaColor;
	}

	/**
	 * @override
	 */
	removeOSDChromaKey() {
		throw new zb.device.errors.UnsupportedFeature('OSD chroma key removing');
	}

	/**
	 * @override
	 */
	getOSDOpacity() {
		throw new zb.device.errors.UnsupportedFeature('OSD opacity getting');
	}

	/**
	 * @override
	 */
	setOSDOpacity() {
		throw new zb.device.errors.UnsupportedFeature('OSD opacity setting');
	}

	/**
	 * @override
	 */
	getIP() {
		throw new zb.device.errors.UnsupportedFeature('IP address getting');
	}

	/**
	 * @override
	 */
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
		const result = typeof window.TvipStb === 'object' &&
			window.TvipStb.toString() === '[object QtRuntimeObject]';
		zb.console.debug('detect tvip', result ? 'true' : 'false', navigator.userAgent);

		return result;
	}
};
