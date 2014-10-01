/*
 * This file is part of the ZombieBox package.
 *
 * Copyright (c) 2011-2013, Interfaced
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
zb.device.platforms.tvip.Input = function () {
	goog.base(this);
	//Rewriting Keys binding
	var keys = zb.device.input.Keys;
	this._map[] = keys.PAUSE;
	this._map[] = keys.PLAY;
	this._map[] = keys.STOP;
	this._map[] = keys.REW;
	this._map[] = keys.FWD;

	this._map[] = keys.BACK;
	this._map[] = keys.ENTER;
	this._map[] = keys.BACKSPACE;

	this._map[] = keys.MENU;
	this._map[] = keys.INFO;
	this._map[] = keys.NEXT_CHAPTER;
	this._map[] = keys.PREV_CHAPTER;

	this._map[] = keys.VOLUME_DOWN;
	this._map[] = keys.VOLUME_UP;
	this._map[] = keys.MUTE;

	this._map[] = keys.RED;
	this._map[] = keys.GREEN;
	this._map[] = keys.YELLOW;
	this._map[] = keys.BLUE;

	this._map[37] = keys.LEFT;
	this._map[39] = keys.RIGHT;
	this._map[38] = keys.UP;
	this._map[40] = keys.DOWN;

	this._map[] = keys.DIGIT_0;
	this._map[] = keys.DIGIT_1;
	this._map[] = keys.DIGIT_2;
	this._map[] = keys.DIGIT_3;
	this._map[] = keys.DIGIT_4;
	this._map[] = keys.DIGIT_5;
	this._map[] = keys.DIGIT_6;
	this._map[] = keys.DIGIT_7;
	this._map[] = keys.DIGIT_8;
	this._map[] = keys.DIGIT_9;

	this._serviceKeys = [];
};
goog.inherits(zb.device.platforms.tvip.Input, zb.device.Input);


/**
 * @inheritDoc
 */
zb.device.platforms.tvip.Input.prototype.eventToKeyCode = function (e) {
	var result = goog.base(this, 'eventToKeyCode', e);
	zb.console.debug('eventToKeyCode', e.keyCode, result);
	return result;
};
