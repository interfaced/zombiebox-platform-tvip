goog.provide('zb.platform.tvip.consts.event');


/**
 * @enum {number}
 */
zb.platform.tvip.consts.event.State = {
	CONNECTING: 1, // Начало подключения к новому URL
	START_GETTING_METADATA: 2, // Получение метаданных
	FINISHED_GETTING_METADATA: 3, // Метаданные получены
	PREPARATION_DECODERS: 4, // Подготовка декодеров
	PLAYING: 5, // Воспроизведение
	FINISH: 6, // Достигнут конец контента
	RESET: 7, // Остановка воспроизведения
	STOP: 8, // Воспроизведение остановлено
	PAUSE: 9, // Воспроизведение поставлено на паузу
	SEEKING: 10, // Происходит seek на новую позицию
	ERROR: 11 // Произошла ошибка
};
