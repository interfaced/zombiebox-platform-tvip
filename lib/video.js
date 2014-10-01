/*
 * This file is part of the ZombieBox package.
 *
 * Copyright (c) 2011-2013, Interfaced
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
goog.provide('zb.device.platforms.tvip.Video');
goog.require('tvip.consts');
goog.require('zb.device.Video');
goog.require('zb.html');



/**
 * Video object abstraction
 * NOTE: Video Interface operates milliseconds in all methods
 * @extends {zb.device.Video}
 * @constructor
 */
zb.device.platforms.tvip.Video = function(tvipPlayer, tvipStb) {
	goog.base(this);
	this._tvipPlayer = tvipPlayer;
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
zb.device.platforms.tvip.Video.prototype._playbackEventCallback = function() {
	var event = this._stbAPIMedia.GetEventDescription();
	if (event.id != this._playerId) {
		return;
	}

	var lastEvent = parseInt(event.type, 10); //TODO по какому основанию парсить?
	var currentState = this._stbAPIMedia.GetPlayerState(this._playerId);
	if (this._lastState != currentState) {
		this._lastState = currentState;
		switch (currentState) {
			case tvip.consts.ERROR:
				this._state = zb.device.IVideo.State.ERROR;
				this._fireEvent(this.EVENT_ERROR);
				zb.console.debug('ERROR');
				break;
			case tvip.consts.ERROR_LOW_DR:
				this._state = zb.device.IVideo.State.ERROR;
				this._fireEvent(this.EVENT_ERROR, 'ERROR_LOW_DR');
				zb.console.debug('ERROR_LOW_DR');
				break;
			case tvip.consts.ERROR_NOT_CN:
				this._state = zb.device.IVideo.State.ERROR;
				this._fireEvent(this.EVENT_ERROR, 'ERROR_NOT_CN');
				zb.console.debug('ERROR_NOT_CN');
				break;
			case tvip.consts.ERROR_NOT_FN:
				this._state = zb.device.IVideo.State.ERROR;
				this._fireEvent(this.EVENT_ERROR, 'ERROR_NOT_FN');
				zb.console.debug('ERROR_NOT_FN');
				break;
			case tvip.consts.ERROR_CANT_OPEN:
				this._state = zb.device.IVideo.State.ERROR;
				this._fireEvent(this.EVENT_ERROR, 'ERROR_CANT_OPEN');
				zb.console.debug('ERROR_CANT_OPEN');
				break;
			case tvip.consts.ERROR_UNKNOWN_CONTENT:
				this._state = zb.device.IVideo.State.ERROR;
				this._fireEvent(this.EVENT_ERROR, 'ERROR_UNKNOWN_CONTENT');
				zb.console.debug('ERROR_UNKNOWN_CONTENT');
				break;
			case tvip.consts.LOADING:
				if (this._firstLoading) {
					this._state = zb.device.IVideo.State.LOADING;
					this._fireEvent(this.EVENT_LOAD_START);
					zb.console.debug('EVENT_LOAD_START');
					this._firstLoading = false;
				} else {
					this._state = zb.device.IVideo.State.BUFFERING;
					this._fireEvent(this.EVENT_BUFFERING);
					zb.console.debug('EVENT_BUFFERING');
				}
				break;
			case tvip.consts.PAUSED:
				this._state = zb.device.IVideo.State.PAUSED;
				this._fireEvent(this.EVENT_PAUSE);
				zb.console.debug('EVENT_PAUSE');
				break;
			case tvip.consts.STOPPED:
				this._state = zb.device.IVideo.State.STOPPED;
				this._fireEvent(this.EVENT_STOP);
				this._fireEvent(this.EVENT_DURATION_CHANGE, 0);
				this._fireEvent(this.EVENT_TIME_UPDATE, 0);
				zb.console.debug('EVENT_STOP');
				break;
			case tvip.consts.MOVING:
				break;
			case tvip.consts.END_OF_STREAM:
				this._fireEvent(this.EVENT_ENDED);
				zb.console.debug('EVENT_ENDED');
				break;
			case tvip.consts.PLAYING_FWD_1X:
				if (this._isPlayFromPosition) {
					this._fireMetaDataEvent();
					this._isPlayFromPosition = false;
				}
				this._fireEvent(this.EVENT_RATE_CHANGE, this.getPlaybackRate());
				this._state = zb.device.IVideo.State.PLAYING;
				this._fireEvent(this.EVENT_PLAY);
				zb.console.debug('EVENT_PLAY');
				break;
			case tvip.consts.PLAYING_FWD_2X:
			case tvip.consts.PLAYING_FWD_4X:
			case tvip.consts.PLAYING_FWD_8X:
			case tvip.consts.PLAYING_FWD_16X:
			case tvip.consts.PLAYING_FWD_32X:
			case tvip.consts.PLAYING_BWD_1X:
			case tvip.consts.PLAYING_BWD_2X:
			case tvip.consts.PLAYING_BWD_4X:
			case tvip.consts.PLAYING_BWD_8X:
			case tvip.consts.PLAYING_BWD_16X:
			case tvip.consts.PLAYING_BWD_32X:
				this._fireEvent(this.EVENT_RATE_CHANGE, this.getPlaybackRate());
				zb.console.debug('EVENT_RATE_CHANGE');
				this._state = zb.device.IVideo.State.SEEKING;
				this._fireEvent(this.EVENT_PLAY);
				this._fireEvent(this.EVENT_TIME_UPDATE, this.getPosition());
				zb.console.debug('EVENT_PLAY and SEEKING');
				break;
			default:
				zb.console.debug('UNKNOWN STATE: ', currentState);
		}
	}

	switch (lastEvent) {
		case tvip.consts.ELT_PLAYER_STATUS_CHANGED:
			break;
		case tvip.consts.ELT_PLAYER_METADATA_UPDATED:
			this._state = zb.device.IVideo.State.INITED;
			if (this._isPlayFromPosition) {
				if (this._startPosition < this._stbAPIMedia.GetDuration(this._playerId)) {
					this.setPosition(this._startPosition);
				} else {
					zb.console.debug('Start position is LONGER than the video');
				}
			} else {
				this._fireMetaDataEvent();
			}

			break;
		case tvip.consts.ELT_PLAYER_POSITION_CHANGED:
			if (this._state != zb.device.IVideo.State.PAUSED) {
				this._fireEvent(this.EVENT_TIME_UPDATE, this.getPosition());
				zb.console.debug('EVENT_TIME_UPDATE');
			}
			this._isPositionReady = true;
			break;
		case tvip.consts.ELT_PLAYER_AUDIO_TRACK_SWITCHED:
			zb.console.debug('ELT_PLAYER_AUDIO_TRACK_SWITCHED');
			break;
		case tvip.consts.ELT_PLAYER_VIDEO_TRACK_SWITCHED:
			zb.console.debug('ELT_PLAYER_VIDEO_TRACK_SWITCHED');
			break;
		case tvip.consts.ELT_PLAYER_SUBTL_TRACK_SWITCHED:
			zb.console.debug('ELT_PLAYER_SUBTL_TRACK_SWITCHED');
			break;
		case tvip.consts.ELT_PLAYER_VOLUME_CHANGED:
		case tvip.consts.ELT_PLAYER_MUTE_CHANGED:
			zb.console.debug('EVENT_VOLUME_CHANGE');
			break;
		case tvip.consts.ELT_PLAYER_ZOOM_CHANGED:
			zb.console.debug('ELT_PLAYER_ZOOM_CHANGED');
			break;
		case tvip.consts.ELT_PLAYER_MULTICAST_GROUP_SWITCHED:
			zb.console.debug('ELT_PLAYER_MULTICAST_GROUP_SWITCHED');
			break;
	}
};


/**
 * @type {TVIPPlayer}
 */
zb.device.platforms.tvip.Video.prototype._tvipPlayer;


/**
 * @type {TVIPStb}
 */
zb.device.platforms.tvip.Video.prototype._tvipStb;


/**
 * @type {zb.device.IVideo.State}
 * @protected
 */
zb.device.platforms.tvip.Video.prototype._state;

