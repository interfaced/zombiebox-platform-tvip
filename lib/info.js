import AbstractInfo from 'zb/device/abstract-info';
import {Resolution, findLargest} from 'zb/device/resolutions';
import UnsupportedFeature from 'zb/device/errors/unsupported-feature';
import PcInfo from 'pc/info';


/**
 */
export default class Info extends PcInfo {
	/**
	 * @param {TVIPStb} tvipStb
	 */
	constructor(tvipStb) {
		super();


		/**
		 * @type {TVIPStb}
		 * @protected
		 */
		this._tvipStb = tvipStb;
	}

	/**
	 * @override
	 */
	type() {
		return 'tvip';
	}

	/**
	 * @override
	 */
	version() {
		const userAgent = navigator.userAgent.toString();

		return userAgent.slice(userAgent.indexOf('TVIP'));
	}

	/**
	 * @override
	 */
	manufacturer() {
		return 'TVIP';
	}

	/**
	 * @override
	 */
	model() {
		return this._tvipStb.getDeviceId();
	}

	/**
	 * @override
	 */
	serialNumber() {
		throw new UnsupportedFeature('Serial number getting');
	}

	/**
	 * @override
	 */
	softwareVersion() {
		return this._tvipStb.getSoftwareVersion();
	}

	/**
	 * @override
	 */
	hardwareVersion() {
		throw new UnsupportedFeature('Hardware version getting');
	}

	/**
	 * @override
	 */
	_getLocale() {
		return this._tvipStb.getCurrentLanguageCode();
	}
}
