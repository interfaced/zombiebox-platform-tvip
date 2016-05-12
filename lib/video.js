/*
 * This file is part of the ZombieBox package.
 *
 * Copyright (c) 2011-2016, Interfaced
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
goog.provide('zb.device.platforms.tvip.Video');
goog.require('zb.device.Video');
goog.require('zb.device.platforms.tvip.ViewPort');
goog.require('zb.html');



/**
 * Video object abstraction
 * NOTE: Video Interface operates milliseconds in all methods
 * @param {TVIPPlayer} tvipPlayer
 * @param {TVIPEvent} tvipEvent
 * @param {TVIPStb} tvipStb
 * @extends {zb.device.Video}
 * @constructor
 */
zb.device.platforms.tvip.Video = function(tvipPlayer, tvipEvent, tvipStb) {
	goog.base(this);
	this._tvipPlayer = tvipPlayer;
	this._tvipEvent = tvipEvent;
	this._tvipStb = tvipStb;
	this._tvipEvent.onPlayerStateChange = this._onPlayerStateChange.bind(this);
	this._startUpdatePosition = this._startUpdatePosition.bind(this);
	this._updatePositionTimeoutId = NaN;
	this._startPosition = NaN;
	this._lastPosition = NaN;
	this._duration = NaN;
	this._isBuffering = false;

	var plugin = {
		stb: this._tvipStb,
		player: this._tvipPlayer
	};

	this._viewport = new zb.device.platforms.tvip.ViewPort(app.getVideoContainer(), plugin);
};
goog.inherits(zb.device.platforms.tvip.Video, zb.device.Video);


/** @inheritDoc */
zb.device.platforms.tvip.Video.prototype.play = function(url, startFrom) {
	var mode = '';
	if (url.indexOf('udp') > -1) {
		mode = 'live';
	}
	if (startFrom) {
		this._startPosition = startFrom;
	}
	this._tvipPlayer.playUrl(url, mode);
};


/** @inheritDoc */
zb.device.platforms.tvip.Video.prototype.resume = function() {
	this._tvipPlayer.unpause();
};


/** @inheritDoc */
zb.device.platforms.tvip.Video.prototype.pause = function() {
	this._tvipPlayer.pause();
};


/** @inheritDoc */
zb.device.platforms.tvip.Video.prototype.togglePause = function() {
	if (this._state === zb.device.IVideo.State.PLAYING) {
		this.pause();
	} else {
		this.resume();
	}
};


/** @inheritDoc */
zb.device.platforms.tvip.Video.prototype.stop = function() {
	this._tvipPlayer.stop();
};


/** @inheritDoc */
zb.device.platforms.tvip.Video.prototype.forward = function() {
	//
};


/** @inheritDoc */
zb.device.platforms.tvip.Video.prototype.rewind = function() {
};


/** @inheritDoc */
zb.device.platforms.tvip.Video.prototype.destroy = function() {
	this._tvipPlayer.stop();
	this._tvipPlayer.reset();
};


/** @inheritDoc */
zb.device.platforms.tvip.Video.prototype.setPlaybackRate = function(rate) {
	//do nothing
};


/** @inheritDoc */
zb.device.platforms.tvip.Video.prototype.getPlaybackRate = function() {
	return 1;
};


/** @inheritDoc */
zb.device.platforms.tvip.Video.prototype.setPosition = function(milliseconds) {
	var minPosition = this._tvipPlayer.getMinPositionMsec();
	var maxPosition = this._tvipPlayer.getMaxPositionMsec();
	if (milliseconds < minPosition) {
		milliseconds = minPosition;
	} else if (milliseconds > maxPosition) {
		milliseconds = maxPosition;
	}

	this._tvipPlayer.seek(milliseconds);
};


/** @inheritDoc */
zb.device.platforms.tvip.Video.prototype.getPosition = function() {
	return this._tvipPlayer.getCurrentPositionMsec();
};


/** @inheritDoc */
zb.device.platforms.tvip.Video.prototype.getDuration = function() {
	return this._tvipPlayer.getMaxPositionMsec();
};


/** @inheritDoc */
zb.device.platforms.tvip.Video.prototype.setVolume = function(zbValue) {
	this._tvipPlayer.setVolume(zbValue);
	this._fireEvent(this.EVENT_VOLUME_CHANGE, zbValue);
};


/** @inheritDoc */
zb.device.platforms.tvip.Video.prototype.getVolume = function() {
	return this._tvipPlayer.getVolume();
};


/** @inheritDoc */
zb.device.platforms.tvip.Video.prototype.setMuted = function(value) {
	this._tvipPlayer.setMute(value);
};


/** @inheritDoc */
zb.device.platforms.tvip.Video.prototype.getMuted = function() {
	return this._tvipPlayer.getMute();
};


/**
 * @param {number} oldState one of zb.device.platforms.tvip.Video.State
 * @param {number} newState one of zb.device.platforms.tvip.Video.State
 * @private
 */
zb.device.platforms.tvip.Video.prototype._onPlayerStateChange = function(oldState, newState) {
	this._checkDurationChange();

	if (newState === zb.device.platforms.tvip.Video.State.PLAYING || newState === zb.device.platforms.tvip.Video.State.SEEKING) {
		this._startUpdatePosition();
	} else {
		this._stopUpdatePosition();
	}

	switch (newState) {
		case zb.device.platforms.tvip.Video.State.ERROR:
			this._setState(zb.device.IVideo.State.ERROR);
			this._fireEvent(this.EVENT_ERROR);
			zb.console.debug('ERROR');
			break;
		case zb.device.platforms.tvip.Video.State.CONNECTING:
			this._setState(zb.device.IVideo.State.INITED);
			this._fireEvent(this.EVENT_LOAD_START);
			zb.console.debug('CONNECTING');
			break;
		case zb.device.platforms.tvip.Video.State.START_GETTING_METADATA:
			this._setState(zb.device.IVideo.State.LOADING);
			zb.console.debug('START_GETTING_METADATA');
			break;
		case zb.device.platforms.tvip.Video.State.FINISHED_GETTING_METADATA:
			this._fireEvent(this.EVENT_LOADED_META_DATA);
			zb.console.debug('FINISHED_GETTING_METADATA');
			break;
		case zb.device.platforms.tvip.Video.State.PREPARATION_DECODERS:
			this._setState(zb.device.IVideo.State.BUFFERING);
			this._fireEvent(this.EVENT_BUFFERING);
			zb.console.debug('PREPARATION_DECODERS');
			break;
		case zb.device.platforms.tvip.Video.State.PLAYING:
			this._setState(zb.device.IVideo.State.PLAYING);
			this._fireEvent(this.EVENT_PLAY);
			if (this._startPosition) {
				this.setPosition(this._startPosition);
				this._startPosition = NaN;
			}
			zb.console.debug('PLAYING');
			break;
		case zb.device.platforms.tvip.Video.State.FINISH:
			this._fireEvent(this.EVENT_ENDED);
			zb.console.debug('FINISH');
			break;
		case zb.device.platforms.tvip.Video.State.RESET:
			zb.console.debug('RESET');
			break;
		case zb.device.platforms.tvip.Video.State.STOP:
			this._setState(zb.device.IVideo.State.STOPPED);
			this._fireEvent(this.EVENT_STOP);
			zb.console.debug('STOP');
			break;
		case zb.device.platforms.tvip.Video.State.PAUSE:
			this._setState(zb.device.IVideo.State.PAUSED);
			this._fireEvent(this.EVENT_PAUSE);
			zb.console.debug('PAUSE');
			break;
		case zb.device.platforms.tvip.Video.State.SEEKING:
			zb.console.debug('SEEKING');
			break;
		default:
			zb.console.warn('not known event', newState);
	}
};


/**
 * @private
 */
zb.device.platforms.tvip.Video.prototype._startUpdatePosition = function() {
	if (!isNaN(this._updatePositionTimeoutId)) {
		this._stopUpdatePosition();
	}

	var currentPosition = this.getPosition();
	var isBuffering = this._checkBuffering(currentPosition);
	if (!isBuffering) {
		this._fireEvent(this.EVENT_TIME_UPDATE, currentPosition);
		//zb.console.debug('EVENT_TIME_UPDATE ', currentPosition);
	}
	this._updatePositionTimeoutId = setTimeout(this._startUpdatePosition, 1000);
};


/**
 * @private
 */
zb.device.platforms.tvip.Video.prototype._stopUpdatePosition = function() {
	clearTimeout(this._updatePositionTimeoutId);
	this._updatePositionTimeoutId = NaN;
};


/**
 * @param {number} currentPosition
 * @return {boolean}
 * @private
 */
zb.device.platforms.tvip.Video.prototype._checkBuffering = function(currentPosition) {
	if (currentPosition === this._lastPosition) {
		if (this._state !== zb.device.IVideo.State.BUFFERING) {
			this._setState(zb.device.IVideo.State.BUFFERING);
			this._fireEvent(this.EVENT_BUFFERING);
			this._isBuffering = true;
		}
		return true;
	} else {
		if (this._isBuffering) {
			this._setState(zb.device.IVideo.State.PLAYING);
			this._fireEvent(this.EVENT_PLAY);
			this._isBuffering = false;
		}
		this._lastPosition = currentPosition;
		return false;
	}
};


/**
 * @private
 */
zb.device.platforms.tvip.Video.prototype._checkDurationChange = function() {
	var duration = this.getDuration();
	if (this._duration !== duration) {
		this._duration = duration;
		this._fireEvent(this.EVENT_DURATION_CHANGE, this._duration);
	}
};


/**
 * @enum {number}
 */
zb.device.platforms.tvip.Video.State = {
	CONNECTING: 1,//начало подключения к новому URL
	START_GETTING_METADATA: 2,//- получение метаданных;
	FINISHED_GETTING_METADATA: 3,//метаданные получены;
	PREPARATION_DECODERS: 4,//подготовка декодеров;
	PLAYING: 5,//воспроизведение;
	FINISH: 6,// достигнут конец контента;
	RESET: 7,// остановка воспроизведения;
	STOP: 8,// воспроизведение остановлено;
	PAUSE: 9,// воспроизведение поставлено на паузу;
	SEEKING: 10,// происходит seek на новую позицию;
	ERROR: 11//произошла ошибка;
};


/**
 * @type {TVIPPlayer}
 */
zb.device.platforms.tvip.Video.prototype._tvipPlayer;


/**
 * @type {TVIPEvent}
 */
zb.device.platforms.tvip.Video.prototype._tvipEvent;


/**
 * @type {TVIPStb}
 */
zb.device.platforms.tvip.Video.prototype._tvipStb;


/**
 * @type {zb.device.IVideo.State}
 * @protected
 */
zb.device.platforms.tvip.Video.prototype._state;


/**
 * @type {number}
 */
zb.device.platforms.tvip.Video.prototype._updatePositionTimeoutId;


/**
 * @type {number}
 */
zb.device.platforms.tvip.Video.prototype._startPosition;


/**
 * @type {number}
 */
zb.device.platforms.tvip.Video.prototype._lastPosition;


/**
 * @type {number}
 */
zb.device.platforms.tvip.Video.prototype._duration;


/**
 * @type {boolean}
 */
zb.device.platforms.tvip.Video.prototype._isBuffering;


/**
 * @type {zb.device.platforms.tvip.ViewPort}
 * @protected
 */
zb.device.platforms.tvip.Video.prototype._viewport;
