goog.provide('zb.device.platforms.tvip.ViewPort');
goog.require('zb.device.AbstractViewPort');
goog.require('zb.device.aspectRatio.AspectRatio');
goog.require('zb.device.aspectRatio.Proportion');
goog.require('zb.device.aspectRatio.Transferring');
goog.require('zb.platform.tvip.consts.player');


/**
 */
zb.device.platforms.tvip.ViewPort = class extends zb.device.AbstractViewPort {
	/**
	 * @param {zb.device.AbstractViewPort.Rect} containerRect
	 * @param  {{stb: TvipStb, player: TvipPlayer}} plugin
	 */
	constructor(containerRect, plugin) {
		super(containerRect);

		/**
		 * @type {{stb: TvipStb, player: TvipPlayer}}
		 * @protected
		 */
		this._plugin = plugin;

		/**
		 * @type {!Object<zb.platform.tvip.consts.player.Ratio, zb.device.aspectRatio.AspectRatio>}
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
	hasAspectRatioFeature() {
		return true;
	}

	/**
	 * @override
	 */
	hasAreaChangeFeature() {
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
		const screenArea = this.getCurrentArea();
		const area = this._createRect(0, 0, 0, 0);
		const ratio = this._findRatioInAspectRatioMap(this._aspectRatio);

		Object.keys(screenArea)
			.forEach((key) => {
				area[key] = Math.floor(screenArea[key] * this._coefficient);
			});

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
		const AspectRatio = zb.device.aspectRatio.AspectRatio;
		const Proportion = zb.device.aspectRatio.Proportion;
		const Transferring = zb.device.aspectRatio.Transferring;
		const TVIPRatio = zb.platform.tvip.consts.player.Ratio;

		this._aspectRatioMap = {};

		this._aspectRatioMap[TVIPRatio.NORMAL] = new AspectRatio(Proportion.Common.AUTO, Transferring.AUTO);
		this._aspectRatioMap[TVIPRatio.FULL] = new AspectRatio(Proportion.Common.AUTO, Transferring.STRETCH);
		this._aspectRatioMap[TVIPRatio.ZOOM] = new AspectRatio(Proportion.Common.AUTO, Transferring.CROP);
	}

	/**
	 * @param {zb.device.aspectRatio.AspectRatio} ratio
	 * @return {?zb.platform.tvip.consts.player.Ratio}
	 * @protected
	 */
	_findRatioInAspectRatioMap(ratio) {
		const supportedRatios =
			/** @type {Array<zb.platform.tvip.consts.player.Ratio>} */ (Object.keys(this._aspectRatioMap));

		return supportedRatios.filter((platformRatio) => ratio.eq(this._aspectRatioMap[platformRatio]))[0] || null;
	}
};
