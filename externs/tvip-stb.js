/**
 * For firmware Linux-QT 5.0.x and above
 * @constructor
 */
let TVIPStb = function() {};

/**
 * Возвращает идентификатор модели устройства. Например, s605.
 * @return {string}
 */
TVIPStb.prototype.getDeviceId = function() {};

/**
 * Возвращает версию прошивки медиацентра.
 * @return {string}
 */
TVIPStb.prototype.getSoftwareVersion = function() {};

/**
 * Возвращает идентификатор текущего активного языка интерфейса ('en', 'ru').
 * @return {string}
 */
TVIPStb.prototype.getCurrentLanguageCode = function() {};


/**
 * Возвращает строку, содержащую основной MAC-адрес приставки. Обычно это MAC-адрес Ethernet.
 * @return {string}
 */
TVIPStb.prototype.getMainMacAddress = function() {};

/**
 * @type {TVIPStb}
 */
Window.prototype.TvipStb;
