import AbstractInput from 'zb/device/abstract-input';
import UnsupportedFeature from 'zb/device/errors/unsupported-feature';
import Key from 'zb/device/input/key';
import {debug} from 'zb/console/console';


/**
 */
export default class Input extends AbstractInput {
	/**
	 * @override
	 */
	eventToKeyCode(e) {
		const result = super.eventToKeyCode(e);
		debug('eventToKeyCode', e.keyCode, result);

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
		throw new UnsupportedFeature('Pointing device enabling');
	}

	/**
	 * @override
	 */
	disablePointingDevice() {
		throw new UnsupportedFeature('Pointing device disabling');
	}

	/**
	 * @override
	 */
	_createKeysMap() {
		const map = {};
		map[415] = Key.PLAY_PAUSE;
		map[413] = Key.STOP;
		map[417] = Key.FWD;
		map[412] = Key.REW;

		map[8] = Key.BACK;
		map[13] = Key.ENTER;

		map[112] = Key.INFO;

		map[403] = Key.RED;
		map[404] = Key.GREEN;
		map[405] = Key.YELLOW;
		map[406] = Key.BLUE;

		map[37] = Key.LEFT;
		map[39] = Key.RIGHT;
		map[38] = Key.UP;
		map[40] = Key.DOWN;

		map[48] = Key.DIGIT_0;
		map[49] = Key.DIGIT_1;
		map[50] = Key.DIGIT_2;
		map[51] = Key.DIGIT_3;
		map[52] = Key.DIGIT_4;
		map[53] = Key.DIGIT_5;
		map[54] = Key.DIGIT_6;
		map[55] = Key.DIGIT_7;
		map[56] = Key.DIGIT_8;
		map[57] = Key.DIGIT_9;

		return map;
	}
}
