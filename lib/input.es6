/*
 * This file is part of the ZombieBox package.
 *
 * Copyright (c) 2011-2016, Interfaced
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
goog.provide('zb.device.platforms.tvip.Input');
goog.require('zb.device.Input');



/**
 * @extends {zb.device.Input}
 * @constructor
 */
zb.device.platforms.tvip.Input = class extends zb.device.Input {
	constructor() {
		super();


		//Rewriting Keys binding
		const keys = zb.device.input.Keys;
		this._map[82] = keys.PLAY_PAUSE;
		this._map[83] = keys.STOP;
		this._map[70] = keys.FWD;
		this._map[66] = keys.REW;
		//this._map[] = keys.PAGE_DOWN;
		//this._map[] = keys.PAGE_UP;


		this._map[27] = keys.BACK;
		this._map[13] = keys.ENTER;
		this._map[8] = keys.BACKSPACE;

		this._map[122] = keys.MENU;
		this._map[89] = keys.INFO;
		this._map[34] = keys.NEXT_CHAPTER;
		this._map[33] = keys.PREV_CHAPTER;

		//this._map[] = keys.VOLUME_DOWN;
		//this._map[] = keys.VOLUME_UP;
		//this._map[] = keys.MUTE;

		this._map[112] = keys.RED;
		this._map[113] = keys.GREEN;
		this._map[114] = keys.YELLOW;
		this._map[115] = keys.BLUE;

		this._map[37] = keys.LEFT;
		this._map[39] = keys.RIGHT;
		this._map[38] = keys.UP;
		this._map[40] = keys.DOWN;

		this._map[48] = keys.DIGIT_0;
		this._map[49] = keys.DIGIT_1;
		this._map[50] = keys.DIGIT_2;
		this._map[51] = keys.DIGIT_3;
		this._map[52] = keys.DIGIT_4;
		this._map[53] = keys.DIGIT_5;
		this._map[54] = keys.DIGIT_6;
		this._map[55] = keys.DIGIT_7;
		this._map[56] = keys.DIGIT_8;
		this._map[57] = keys.DIGIT_9;

		this._serviceKeys = [];
	}

	/**
	 * @override
	 */
	eventToKeyCode(e) {
		const result = super.eventToKeyCode(e);
		zb.console.debug('eventToKeyCode', e.keyCode, result);
		return result;
	}
};
