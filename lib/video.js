/*
 * This file is part of the ZombieBox package.
 *
 * Copyright (c) 2011-2013, Interfaced
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
goog.provide('zb.device.platforms.tvip.Video');
goog.require('zb.device.Video');
goog.require('zb.html');



/**
 * Video object abstraction
 * NOTE: Video Interface operates milliseconds in all methods
 * @extends {zb.device.Video}
 * @constructor
 */
zb.device.platforms.tvip.Video = function(tvipPlayer, tvipEvent) {
	goog.base(this);
	this._tvipPlayer = tvipPlayer;
	this._tvipEvent = tvipEvent;
	this._tvipEvent.onPlayerStateChange = this._onPlayerStateChange.bind(this);
};
goog.inherits(zb.device.platforms.tvip.Video, zb.device.Video);


/** @inheritDoc */
zb.device.platforms.tvip.Video.prototype.play = function(url, startFrom) {
	var mode = '';
	if (url.indexOf('udp') > -1) {
		mode = 'live';
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
	//todo
};


/** @inheritDoc */
zb.device.platforms.tvip.Video.prototype.getPlaybackRate = function() {
	//todo
};


/** @inheritDoc */
zb.device.platforms.tvip.Video.prototype.setPosition = function(milliseconds) {
	this._tvipPlayer.seek(milliseconds);
};


/** @inheritDoc */
zb.device.platforms.tvip.Video.prototype.getPosition = function() {
	return this._tvipPlayer.getCurrentPositionMsec();
};


/** @inheritDoc */
zb.device.platforms.tvip.Video.prototype.getDuration = function() {
	this._tvipPlayer.getMaxPositionMsec();
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
 * @private
 */
zb.device.platforms.tvip.Video.prototype._onPlayerStateChange = function(oldState, newState) {
	switch (newState) {
		case this.State.ERROR:
			this._setState(zb.device.IVideo.State.ERROR);
			this._fireEvent(this.EVENT_ERROR);
			zb.console.debug('ERROR');
			break;
		case this.State.CONNECTING:
			this._setState(zb.device.IVideo.State.INITED);
			this._fireEvent(this.EVENT_LOAD_START);
			zb.console.debug('CONNECTING');
			break;
		case this.State.START_GETTING_METADATA:
			this._setState(zb.device.IVideo.State.LOADING);
			this._fireEvent(this.EVENT_LOADED_META_DATA);
			zb.console.debug('START_GETTING_METADATA');
			break;
		case this.State.FINISHED_GETTING_METADATA:
			//todo hz
			zb.console.debug('FINISHED_GETTING_METADATA');
			break;
		case this.State.PREPARATION_DECODERS:
			this._setState(zb.device.IVideo.State.BUFFERING);
			this._fireEvent(this.EVENT_BUFFERING);
			zb.console.debug('PREPARATION_DECODERS');
			break;
		case this.State.PLAYING:
			this._setState(zb.device.IVideo.State.PLAYING);
			this._fireEvent(this.EVENT_PLAY);
			zb.console.debug('PLAYING');
			break;
		case this.State.FINISH:
			//todo hz
			zb.console.debug('FINISH');
			break;
		case this.State.RESET:
			//todo hz
			zb.console.debug('RESET');
			break;
		case this.State.STOP:
			this._setState(zb.device.IVideo.State.STOPPED);
			this._fireEvent(this.EVENT_STOP);
			zb.console.debug('STOP');
			break;
		case this.State.PAUSE:
			this._setState(zb.device.IVideo.State.PAUSED);
			this._fireEvent(this.EVENT_PAUSE);
			zb.console.debug('PAUSE');
			break;
		case this.State.SEEKING:
			//todo hz
			zb.console.debug('SEEKING');
			break;
		default:
			zb.console.warn('not known event', newState);
	}
};


zb.device.platforms.tvip.Video.prototype._setState = function(state) {
	if (this._state !== state) {
		this._state = state;
		this._fireEvent(this.EVENT_STATE_CHANGE, state);
	}
};


/**
 * @enum {number}
 */
zb.device.platforms.tvip.Video.prototype.State = {
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
 * @type {zb.device.IVideo.State}
 * @protected
 */
zb.device.platforms.tvip.Video.prototype._state;

