/**
 * Based on JavaScript API, version 1. For firmware linux-qt 3.2.0
 * @constructor
 * @extends {HTMLElement}
 */
function TvipRecorder() {}


/**
 * Добавляет новое задание на запись эфира.
 * Здесь:
 *      name - произвольное имя записи,
 *      url - URL потока
 *          поддерживаются потоки в формате MPEGTS через UDP, RTP и HTTP, path - локальный путь для записи,
 *      start и end - время начала и окончания записи в UNIX TIMESTAMP либо в формате «YYYYMMDDTHHmmss».
 * Возвращает уникальный идентификатор созданного задания.
 * @param {string} name
 * @param {string} url
 * @param {string} path
 * @param {string} start
 * @param {string} eng
 * @return {string}
 */
TvipRecorder.prototype.addRecord = function(name, url, path, start, eng) {};


/**
 * Удаляет задание на запись с уникальным идентификатором id.
 * Если removeFile=true, удаляется также записанный на диск поток.
 * Возвращает true в случае успешного удаления.
 * @param {string} id
 * @param {boolean} removeFile
 * @return {boolean}
 */
TvipRecorder.prototype.cancelRecord = function(id, removeFile) {};


/**
 * Меняет время начала и/или окончания записи с уникальным идентификатором id.
 * Если требуется поменять только одно из значений, то второе - пустая строка.
 * Формат start и end см. в описании addRecord.
 * @param {string} id
 * @param {string} start
 * @param {string} end
 * @return {void}
 */
TvipRecorder.prototype.updateStartEndTime = function(id, start, end) {};


/**
 * Возвращает список уникальных идентификаторов заданий, которые добавлены в настоящий момент.
 * @return {Array<string>}
 */
TvipRecorder.prototype.getRecordIds = function() {};


/**
 * Возвращает объект с параметрами записи с уникальным идентификатором id.
 * @param {string} id
 * @return {TvipRecorder.Record}
 */
TvipRecorder.prototype.getRecord = function(id) {};


/**
 * Fields:
 * id, name, startTime, endTime - соответствуют параметром метода addRecord,
 * url - url потока,
 * status - See ...consts.recorder for possible values and description
 * @typedef {{
 *     id: string,
 *     name: string,
 *     startTime: string,
 *     endTime: string,
 *     url: string,
 *     status: string
 * }}
 */
TvipRecorder.Record;
