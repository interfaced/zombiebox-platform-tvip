/**
 * Based on JavaScript API, version 1. For firmware linux-qt 3.2.0
 * @constructor
 * @extends {HTMLElement}
 */
function TvipEvent() {}


/**
 * Вызывается при изменении статуса воспроизведения медиаплеера.
 * oldState - предыдущий статус плеера,
 * newState - новый статус плеера.
 * See ...consts.event for possible values
 * @param {number} oldState
 * @param {number} newState
 */
TvipEvent.prototype.onPlayerStateChange = function(oldState, newState) {};
