/**
 * Based on JavaScript API, version 1. For firmware linux-qt 3.2.0
 * @constructor
 * @extends {HTMLElement}
 */
function TvipStb() {}

/**
 * Возвращает номер версии API.
 * @return {number}
 */
TvipStb.prototype.getApiVersion = function() {};


/**
 * Возвращает идентификатор текущего активного языка интерфейса ('en', 'ru').
 * @return {string}
 */
TvipStb.prototype.getCurrentLanguageCode = function() {};


/**
 * Возвращает текущий часовой пояс (например, Europe/Moscow).
 * @return {string}
 */
TvipStb.prototype.getCurrentTimezone = function() {};


/**
 * Возвращает текущий режим дисплея («1080i», «1080p», «720p», «576i», и т.д.).
 * @return {string}
 */
TvipStb.prototype.getDisplayMode = function() {};


/**
 * Возвращает список имен каталогов в системном каталоге directory.
 * @param {string} directory
 * @return {Array<string>}
 */
TvipStb.prototype.getDirectoryDirs = function(directory) {};


/**
 * Возвращает список объектов с данными о файлах (без каталогов) в системном каталоге directory.
 * @param {string} directory
 * @return {Array<{
 *     name: string,
 *     size: number
 * }>}
 */
TvipStb.prototype.getDirectoryFiles = function(directory) {};


/**
 * См. TvipStb.prototype.reset
 * Задать фильтры имен файлов для getDirectoryFiles и getDirectoryDirs. Фильтры разделяются символом |.
 * Можно использовать символы ? и *. Например: *.avi|*.mp3
 * @param {string} filters
 * @return {void}
 */
TvipStb.prototype.setDirectoryListFilters = function(filters) {};


/**
 * Получить переменную из постоянного хранилища браузера. Если name не найден, вернется пустая строка.
 * @param {string} name
 * @return {string}
 */
TvipStb.prototype.getEnvValue = function(name) {};


/**
 * Возвращает строку, содержащую основной MAC-адрес приставки. Обычно это MAC-адрес Ethernet.
 * @return {string}
 */
TvipStb.prototype.getMainMacAddress = function() {};


/**
 * Возвращает список объектов смонтированных накопителей (локальных и сетевых).
 * Поля объекта:
 *   label - имя (метка) смонтированного ресурса для отображения пользователю;
 *   path - каталог, в который смонтирован ресурс;
 *   fstype - тип файловой системы (варианты: vfat, ntfs, ext2, ext3, nfs, cifs.
 * @return {Array<{
 *     label: string,
 *     path: string,
 *     fstype: string
 * }>}
 */
TvipStb.prototype.getStorageValues = function() {};


/**
 * Возвращает true, если в системной файловой системе существует каталог с именем osPath, иначе false.
 * @param {string} path
 * @return {boolean}
 */
TvipStb.prototype.hasDirectory = function(path) {};


/**
 * Возвращает true, если в системной файловой системе существует файл (не каталог) с именем osPath, иначе false.
 * @param {string} path
 * @return {boolean}
 */
TvipStb.prototype.hasFile = function(path) {};


/**
 * Запустить системные настройки Tvip.
 * @return {void}
 */
TvipStb.prototype.launchPreferences = function() {};


/**
 * Выводит отладочное сообщение в системную консоль (Linux) или logcat (Android).
 * @param {string} message
 * @return {void}
 */
TvipStb.prototype.logDebug = function(message) {};


/**
 * См. TvipStb.prototype.reset
 * Установка цвета UI, который будет считаться прозрачным. color - цвет в формате RGB.
 * @param {number} color
 * @return {void}
 */
TvipStb.prototype.setColorKey = function(color) {};


/**
 * См. TvipStb.prototype.reset
 * Устанавливает HTTP-заголовок для будущих HTTP-запросов браузера.
 *      header - имя заголовка,
 *      value - значение заголовка.
 * Если value пустая строка, то удаляется ранее установленный заголовок.
 * @param {string} header
 * @param {string} value
 * @return {void}
 */
TvipStb.prototype.setCustomHeader = function(header, value) {};


/**
 * Сохранить переменную в постоянном хранилище браузера. Все переменные доступны всем страницам браузера.
 * @param {string} name
 * @param {string} value
 * @return {void}
 */
TvipStb.prototype.setEnvValue = function(name, value) {};


/**
 * Отобразить (show=true) или скрыть (show=false) виртуальную клавиатуру.
 * @param {boolean} show
 * @return {void}
 */
TvipStb.prototype.showVirtualKeyboard = function(show) {};


/**
 * Сбросить настройки: прозрачного цвета; HTTP-заголовков; фильтра файлов
 * @return {void}
 */
TvipStb.prototype.reset = function() {};


/**
 * НЕДОКУММЕНТИРОВАННЫЙ МЕТОД.
 * Для использования arescam достаточно писать TvipStb.execCommand("arescam параметры")
 * @param {string} command
 * @return {void}
 */
TvipStb.prototype.execCommand = function(command) {};
