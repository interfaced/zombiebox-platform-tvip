goog.provide('zb.platform.tvip.consts.recorder');


/**
 * @enum {string}
 */
zb.platform.tvip.consts.recorder.RecordStatusType = {
	WAITING: 'waiting',// Ожидает запись
	RECORDING: 'recording',// Запись в процессе
	FINISHED: 'finished',// Запись завершена
	ERROR: 'error'// Произошла ошибка
};
