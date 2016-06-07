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
