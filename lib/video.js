goog.provide('zb.device.platforms.tvip.Video');
goog.require('zb.console');
goog.require('zb.device.AbstractVideo');
goog.require('zb.device.AbstractViewPort');
goog.require('zb.device.IVideo');
goog.require('zb.device.errors.UnsupportedFeature');
goog.require('zb.device.platforms.tvip.ViewPort');


/**
 * @implements {zb.device.IVideo}
 */
zb.device.platforms.tvip.Video = class extends zb.device.AbstractVideo {
	/**
	 * @param {HTMLElement} videoContainer
	 * @param {TvipPlayer} tvipPlayer
	 * @param {TvipEvent} tvipEvent
	 * @param {TvipStb} tvipStb
	 */
	constructor(videoContainer, tvipPlayer, tvipEvent, tvipStb) {
		super(videoContainer);


		/**
		 * @type {zb.device.platforms.tvip.ViewPort}
		 * @protected
		 */
		this._viewport;

		/**
		 * @type {TvipEvent}
		 * @protected
		 */
		this._tvipEvent = tvipEvent;

		/**
		 * @type {TvipPlayer}
		 * @protected
		 */
		this._tvipPlayer = tvipPlayer;

		/**
		 * @type {TvipStb}
		 * @protected
		 */
		this._tvipStb = tvipStb;

		/**
		 * @type {zb.device.IVideo.State}
		 * @protected
		 */
		this._state;

		/**
		 * @type {number}
		 * @protected
		 */
		this._updatePositionTimeoutId = NaN;

		/**
		 * @type {number}
		 * @protected
		 */
		this._startPosition = NaN;

		/**
		 * @type {number}
		 * @protected
		 */
		this._lastPosition = NaN;

		/**
		 * @type {number}
		 * @protected
		 */
		this._duration = NaN;

		/**
		 * @type {boolean}
		 * @protected
		 */
		this._isBuffering = false;

		/**
		 * @type {string}
		 * @protected
		 */
		this._url = '';


		this._initViewPort();
		this._tvipEvent.onPlayerStateChange = this._onPlayerStateChange.bind(this);
		this._startUpdatePosition = this._startUpdatePosition.bind(this);
	}

	/**
	 * @override
	 */
	play(url, startFrom) {
		this._url = url;
		let mode = '';
		if (url.indexOf('udp') > -1) {
			mode = 'live';
		}
		if (startFrom) {
			this._startPosition = startFrom;
		}
		this._tvipPlayer.playUrl(url, mode);
		this._viewport.updateViewPort();
	}

	/**
	 * @override
	 */
	getUrl() {
		return this._url;
	}

	/**
	 * @override
	 */
	resume() {
		this._tvipPlayer.unpause();
	}

	/**
	 * @override
	 */
	pause() {
		this._tvipPlayer.pause();
	}

	/**
	 * @override
	 */
	togglePause() {
		if (this._state === zb.device.IVideo.State.PLAYING) {
			this.pause();
		} else {
			this.resume();
		}
	}

	/**
	 * @override
	 */
	stop() {
		this._tvipPlayer.stop();
	}

	/**
	 * @override
	 */
	forward() {
		throw new zb.device.errors.UnsupportedFeature('Fast forward');
	}

	/**
	 * @override
	 */
	rewind() {
		throw new zb.device.errors.UnsupportedFeature('Rewind');
	}

	/**
	 * @override
	 */
	destroy() {
		this._tvipPlayer.stop();
		this._tvipPlayer.reset();
		this._url = '';
	}

	/**
	 * @override
	 */
	setPlaybackRate(rate) {
		throw new zb.device.errors.UnsupportedFeature('Setting playback rate');
	}

	/**
	 * @override
	 */
	getPlaybackRate() {
		throw new zb.device.errors.UnsupportedFeature('Getting playback rate');
	}

	/**
	 * @override
	 */
	setPosition(milliseconds) {
		const minPosition = this._tvipPlayer.getMinPositionMsec();
		const maxPosition = this._tvipPlayer.getMaxPositionMsec();
		const normalized = Math.min(maxPosition, Math.max(minPosition, milliseconds));

		this._tvipPlayer.seek(normalized);
	}

	/**
	 * @override
	 */
	getPosition() {
		return this._tvipPlayer.getCurrentPositionMsec();
	}

	/**
	 * @override
	 */
	getDuration() {
		return this._tvipPlayer.getMaxPositionMsec();
	}

	/**
	 * @override
	 */
	setVolume(zbValue) {
		this._tvipPlayer.setVolume(zbValue);
		this._fireEvent(this.EVENT_VOLUME_CHANGE, zbValue);
	}

	/**
	 * @override
	 */
	getVolume() {
		return this._tvipPlayer.getVolume();
	}

	/**
	 * @override
	 */
	setMuted(value) {
		this._tvipPlayer.setMute(value);
	}

	/**
	 * @override
	 */
	getMuted() {
		return this._tvipPlayer.getMute();
	}

	/**
	 * @param {zb.device.AbstractViewPort.Rect} containerRect
	 * @return {zb.device.platforms.tvip.ViewPort}
	 * @protected
	 */
	_createViewPort(containerRect) {
		const plugin = {
			stb: this._tvipStb,
			player: this._tvipPlayer
		};

		return new zb.device.platforms.tvip.ViewPort(containerRect, plugin);
	}

	/**
	 * @param {number} oldState one of zb.device.platforms.tvip.Video.State
	 * @param {number} newState one of zb.device.platforms.tvip.Video.State
	 * @protected
	 */
	_onPlayerStateChange(oldState, newState) {
		this._checkDurationChange();

		if (
			newState === zb.device.platforms.tvip.Video.State.PLAYING ||
			newState === zb.device.platforms.tvip.Video.State.SEEKING
		) {
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
	}

	/**
	 * @protected
	 */
	_startUpdatePosition() {
		if (!isNaN(this._updatePositionTimeoutId)) {
			this._stopUpdatePosition();
		}

		const currentPosition = this.getPosition();
		const isBuffering = this._checkBuffering(currentPosition);
		if (!isBuffering) {
			this._fireEvent(this.EVENT_TIME_UPDATE, currentPosition);
		}
		this._updatePositionTimeoutId = setTimeout(this._startUpdatePosition, 1000);
	}

	/**
	 * @protected
	 */
	_stopUpdatePosition() {
		clearTimeout(this._updatePositionTimeoutId);
		this._updatePositionTimeoutId = NaN;
	}

	/**
	 * @param {number} currentPosition
	 * @return {boolean}
	 * @protected
	 */
	_checkBuffering(currentPosition) {
		if (currentPosition === this._lastPosition) {
			if (this._state !== zb.device.IVideo.State.BUFFERING) {
				this._setState(zb.device.IVideo.State.BUFFERING);
				this._fireEvent(this.EVENT_BUFFERING);
				this._isBuffering = true;
			}

			return true;
		}

		if (this._isBuffering) {
			this._setState(zb.device.IVideo.State.PLAYING);
			this._fireEvent(this.EVENT_PLAY);
			this._isBuffering = false;
		}
		this._lastPosition = currentPosition;

		return false;
	}

	/**
	 * @protected
	 */
	_checkDurationChange() {
		const duration = this.getDuration();
		if (this._duration !== duration) {
			this._duration = duration;
			this._fireEvent(this.EVENT_DURATION_CHANGE, this._duration);
		}
	}
};


/**
 * @enum {number}
 */
zb.device.platforms.tvip.Video.State = {
	CONNECTING: 1, // Начало подключения к новому URL
	START_GETTING_METADATA: 2, // Получение метаданных;
	FINISHED_GETTING_METADATA: 3, // Метаданные получены;
	PREPARATION_DECODERS: 4, // Подготовка декодеров;
	PLAYING: 5, // Воспроизведение;
	FINISH: 6, // Достигнут конец контента;
	RESET: 7, // Остановка воспроизведения;
	STOP: 8, // Воспроизведение остановлено;
	PAUSE: 9, // Воспроизведение поставлено на паузу;
	SEEKING: 10, // Происходит seek на новую позицию;
	ERROR: 11 // Произошла ошибка;
};
