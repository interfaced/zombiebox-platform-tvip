/**
 * Based on JavaScript API, version 1. For firmware linux-qt 3.2.0
 * @constructor
 * @extends {HTMLElement}
 */
function TVIPEvent() {}


/**
 * Вызывается при изменении статуса воспроизведения медиаплеера.
 * oldState - предыдущий статус плеера,
 * newState - новый статус плеера.
 * @param {number} oldState
 * @param {number} newState
 */
TVIPEvent.prototype.onPlayerStateChange = function(oldState, newState) {};


/**
 *
 * @enum {number}
 */
TVIPEvent.State = {
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
