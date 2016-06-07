goog.provide('tvip.consts.TVIPEvent');
goog.provide('tvip.consts.TVIPPlayer');
goog.provide('tvip.consts.TVIPRecorder');


/**
 * @enum {string}
 */
tvip.consts.TVIPPlayer.StreamInfoType = {
	VIDEO: 'v',
	AUDIO: 'a',
	SUBTITLE: 's'
};


/**
 * @enum {string}
 */
tvip.consts.TVIPPlayer.Ratio = {
	NORMAL: 'box',
	FULL: 'full',
	ZOOM: 'zoom'
};


/**
 * @enum {number}
 */
tvip.consts.TVIPEvent.State = {
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
 * «waiting» - ожидает запись,
 * «recording» - запись в процессе,
 * «finished» - запись завершена,
 * «error» - произошла ошибка.
 * @enum {string}
 */
tvip.consts.TVIPRecorder.RecordStatusType = {
	WAITING: 'waiting',
	RECORDING: 'recording',
	FINISHED: 'finished',
	ERROR: 'error'
};
