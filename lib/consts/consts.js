goog.provide('tvip.consts');


/**
 * TVIPPlayer consts
 */
tvip.consts.TVIPPlayer = {};


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
 * TVIPEvent consts
 */
tvip.consts.TVIPEvent = {};


/**
 * @enum {number}
 */
tvip.consts.TVIPEvent.State = {
	CONNECTING: 1,// Начало подключения к новому URL
	START_GETTING_METADATA: 2,// Получение метаданных
	FINISHED_GETTING_METADATA: 3,// Метаданные получены
	PREPARATION_DECODERS: 4,// Подготовка декодеров
	PLAYING: 5,// Воспроизведение
	FINISH: 6,// Достигнут конец контента
	RESET: 7,// Остановка воспроизведения
	STOP: 8,// Воспроизведение остановлено
	PAUSE: 9,// Воспроизведение поставлено на паузу
	SEEKING: 10,// Происходит seek на новую позицию
	ERROR: 11// Произошла ошибка
};


/**
 * TVIPRecorder consts
 */
tvip.consts.TVIPRecorder = {};


/**
 * @enum {string}
 */
tvip.consts.TVIPRecorder.RecordStatusType = {
	WAITING: 'waiting',// Ожидает запись
	RECORDING: 'recording',// Запись в процессе
	FINISHED: 'finished',// Запись завершена
	ERROR: 'error'// Произошла ошибка
};
