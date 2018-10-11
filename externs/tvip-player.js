/**
 * Based on JavaScript API, version 1. For firmware linux-qt 3.2.0
 * @constructor
 * @extends {HTMLElement}
 */
function TvipPlayer() {}

/**
 * Сбросить воспроизведение.
 * При переходе между страницами, если не требуется продолжение проигрывания, нужно вызывать этот метод.
 * @return {void}
 */
TvipPlayer.prototype.reset = function() {};


/**
 * Начать проигрывание видео по заданному URL или непосредственному пути в файловой системе.
 * Параметр mode может принимать значения:
 * vod - данный URL содержит VOD-файл (с конечной длиной);
 * live - дынный URL содержит live ТВ-поток (можно использовать Timeshift и DVR);
 * '' - судя по примерам - тоже самое, что и vod
 * Примеры:
 * playUrl ("udp://239.1.1.1", "live"); // начать проигрывание multicast-потока;
 * playUrl ("http://domain.tv/movies/movie.mkv", ""); // начать проигрывание видео-файла по http;
 * playUrl ("http://domain.tv/hls/playlist.m3u8", ""); // начать проигрывание HLS-видео;
 * @return {void}
 */
TvipPlayer.prototype.playUrl = function(url, mode) {};


/**
 * Устанавливает размер окна видео. Координаты устанавливаются относительно текущего режима видео выхода.
 * Если w = 0 и h = 0, используется полноэкранный режим.
 * Если onTop = true, видео окно рисуется поверх UI.
 * @param {number} x
 * @param {number} y
 * @param {number} w
 * @param {number} h
 * @param {boolean} onTop
 * @return {void}
 */
TvipPlayer.prototype.setVideoWindow = function(x, y, w, h, onTop) {};


/**
 * Остановить воспроизведение, если оно было запущено.
 * @return {void}
 */
TvipPlayer.prototype.stop = function() {};


/**
 * Остановить воспроизведение, если оно было запущено.
 * @return {void}
 */
TvipPlayer.prototype.pause = function() {};


/**
 * Продолжить воспроизведение, если оно было поставлено на паузу.
 * @return {void}
 */
TvipPlayer.prototype.unpause = function() {};


/**
 * Установить позицию воспроизведения на position в миллисекундах.
 * Необходимо учитывать, что начало воспроизведения - это minPosition - см. ниже.
 * @param {number} position
 * @return {void}
 */
TvipPlayer.prototype.seek = function(position) {};


/**
 * Возвращает текущую позицию воспроизведения.
 * @return {number}
 */
TvipPlayer.prototype.getCurrentPositionMsec = function() {};


/**
 * Возвращает минимальную позицию воспроизведения (т.е. начало контента).
 * @return {number}
 */
TvipPlayer.prototype.getMinPositionMsec = function() {};


/**
 * Возвращает максимальную позицию воспроизведения (т.е. конца контента).
 * @return {number}
 */
TvipPlayer.prototype.getMaxPositionMsec = function() {};


/**
 * Устанавливает громкость звука в интервале от 0 до 100.
 * @param {number} value
 * @return {void}
 */
TvipPlayer.prototype.setVolume = function(value) {};


/**
 * Возвращает текущую громкость звука в интервале от 0 до 100.
 * @return {number}
 */
TvipPlayer.prototype.getVolume = function() {};


/**
 * Отключает (mute=true) или включает (mute=false) звук.
 * @param {boolean} mute
 * @return {void}
 */
TvipPlayer.prototype.setMute = function(mute) {};


/**
 * Возвращает true, если звук выключен, иначе false;
 * @return {boolean}
 */
TvipPlayer.prototype.getMute = function() {};


/**
 * Устанавливает режим aspect ratio.
 * На данный момент поддерживаются значения: «box» - Оригинал, «full» - На весь экран, «zoom» - Увеличенный.
 * @param {string} mode See ...consts.player for possible values.
 * @return {void}
 */
TvipPlayer.prototype.setAspectRatio = function(mode) {};


/**
 * Возвращает тип контейнера последнего проигрываемого контента (например, mpegts, avi, matroska).
 * @return {string}
 */
TvipPlayer.prototype.getContainerType = function() {};


/**
 * Возвращает количество медиапотоков в последнем проигрываемом контенте (аудио, видео, субтитров, итд).
 * @return {number}
 */
TvipPlayer.prototype.getStreamsCount = function() {};


/**
 * @param {number} index
 * @return {TvipPlayer.StreamInfo}
 */
TvipPlayer.prototype.getStreamInfo = function(index) {};


/**
 * Возвращает номер потока с видео-дорожкой, проигрываемой в данный момент.
 * @return {number}
 */
TvipPlayer.prototype.getCurrentVideoStreamIndex = function() {};


/**
 * Возвращает номер потока с аудио-дорожкой, проигрываемой в данный момент.
 * @return {number}
 */
TvipPlayer.prototype.getCurrentAudioStreamIndex = function() {};


/**
 * Устанавливает номер активной аудио-дорожки (index).
 * @param {number} index
 * @return {void}
 */
TvipPlayer.prototype.setCurrentAudioStreamIndex = function(index) {};


/**
 * Fields:
 * type - тип медиапотока: See ...consts.player for possible values
 * id - внутренний идентификатор (PID);
 * codec - название кодека потока;
 * lang - для аудиопотоков 3 буквенный код языка.
 * @typedef {{
 *     type: string,
 *     id: number,
 *     codec: string,
 *     lang: string
 * }}
 */
TvipPlayer.StreamInfo;
