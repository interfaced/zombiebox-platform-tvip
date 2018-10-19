goog.provide('zb.device.platforms.tvip.Input');
goog.require('zb.console');
goog.require('zb.device.AbstractInput');
goog.require('zb.device.errors.UnsupportedFeature');
goog.require('zb.device.input.Keys');


/**
 */
zb.device.platforms.tvip.Input = class extends zb.device.AbstractInput {
	/**
	 * @override
	 */
	eventToKeyCode(e) {
		const result = super.eventToKeyCode(e);
		zb.console.debug('eventToKeyCode', e.keyCode, result);

		return result;
	}

	/**
	 * @override
	 */
	isPointingDeviceSupported() {
		return false;
	}

	/**
	 * @override
	 */
	enablePointingDevice() {
		throw new zb.device.errors.UnsupportedFeature('Pointing device enabling');
	}

	/**
	 * @override
	 */
	disablePointingDevice() {
		throw new zb.device.errors.UnsupportedFeature('Pointing device disabling');
	}

	/**
	 * @override
	 */
	_createKeysMap() {
		const map = {};
		const Keys = zb.device.input.Keys;
		map[82] = Keys.PLAY_PAUSE;
		map[83] = Keys.STOP;
		map[70] = Keys.FWD;
		map[66] = Keys.REW;

		map[27] = Keys.BACK;
		map[13] = Keys.ENTER;
		map[8] = Keys.BACKSPACE;

		map[122] = Keys.MENU;
		map[89] = Keys.INFO;
		map[34] = Keys.NEXT_CHAPTER;
		map[33] = Keys.PREV_CHAPTER;

		map[112] = Keys.RED;
		map[113] = Keys.GREEN;
		map[114] = Keys.YELLOW;
		map[115] = Keys.BLUE;

		map[37] = Keys.LEFT;
		map[39] = Keys.RIGHT;
		map[38] = Keys.UP;
		map[40] = Keys.DOWN;

		map[48] = Keys.DIGIT_0;
		map[49] = Keys.DIGIT_1;
		map[50] = Keys.DIGIT_2;
		map[51] = Keys.DIGIT_3;
		map[52] = Keys.DIGIT_4;
		map[53] = Keys.DIGIT_5;
		map[54] = Keys.DIGIT_6;
		map[55] = Keys.DIGIT_7;
		map[56] = Keys.DIGIT_8;
		map[57] = Keys.DIGIT_9;

		return map;
	}
};
