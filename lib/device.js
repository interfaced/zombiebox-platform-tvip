import AbstractDevice from 'zb/device/abstract-device';
import HTML5Video from 'zb/device/common/HTML5-video';
import LocalStorage from 'zb/device/common/local-storage';
import StatefulHtml5Video from 'zb/device/common/stateful-html5-video';
import {Resolution, ResolutionInfo} from 'zb/device/resolutions';
import Rect from 'zb/geometry/rect';
import {debug} from 'zb/console/console';
import UnsupportedFeature from 'zb/device/errors/unsupported-feature';
import PcDevice from 'pc/device';
import Info from './info';
import Input from './input';


/**
 */
export default class Device extends PcDevice {
	/**
	 */
	constructor() {
		super();

		/**
		 * @type {Info}
		 */
		this.info;

		/**
		 * @type {Input}
		 */
		this.input;

		/**
		 * @type {TVIPStb}
		 * @protected
		 */
		this._tvipStb = window.TvipStb;
	}

	/**
	 * @override
	 */
	init() {
		this.storage = new LocalStorage();
		this.info = new Info(this._tvipStb);
		this.input = new Input();

		this._listenIntenetConnection();
		this._fireEvent(this.EVENT_READY);
	}

	/**
	 * @override
	 * @param {Rect} rect
	 */
	createVideo(rect) {
		return new HTML5Video(rect);
	}

	/**
	 * @override
	 */
	createStatefulVideo() {
		return new StatefulHtml5Video(
			ResolutionInfo[this.info.getPanelResolution() || Resolution.HD],
			ResolutionInfo[this.info.getOSDResolution() || Resolution.HD]
		);
	}

	/**
	 * @override
	 */
	exit() {
		window.close();
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
			navigator.userAgent.toString().indexOf('TVIP') !== -1
		debug('detect tvip', result ? 'true' : 'false', navigator.userAgent);

		return result;
	}
}
