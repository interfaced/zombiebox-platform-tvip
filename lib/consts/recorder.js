goog.provide('zb.platform.tvip.consts.recorder');


/**
 * @enum {string}
 */
zb.platform.tvip.consts.recorder.RecordStatusType = {
	ERROR: 'error',// Произошла ошибка
	FINISHED: 'finished',// Запись завершена
	RECORDING: 'recording',// Запись в процессе
	WAITING: 'waiting'// Ожидает запись
};
