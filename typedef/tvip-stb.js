/**
 * Based on JavaScript API, version 1. For firmware linux-qt 3.2.0
 * @constructor
 * @extends {HTMLElement}
 */
function TVIPStb() {}

/**
 * Возвращает номер версии API.
 * @return {number}
 */
TVIPStb.prototype.getApiVersion = function() {};


/**
 * Возвращает идентификатор текущего активного языка интерфейса ('en', 'ru').
 * @return {string}
 */
TVIPStb.prototype.getCurrentLanguageCode = function() {};


/**
 * Возвращает текущий часовой пояс (например, Europe/Moscow).
 * @return {string}
 */
TVIPStb.prototype.getCurrentTimezone = function() {};


/**
 * Возвращает текущий режим дисплея («1080i», «1080p», «720p», «576i», и т.д.).
 * @return {string}
 */
TVIPStb.prototype.getDisplayMode = function() {};


/**
 * Возвращает список имен каталогов в системном каталоге directory.
 * @param {string} directory
 * @return {Array.<string>}
 */
TVIPStb.prototype.getDirectoryDirs = function(directory) {};


/**
 * Возвращает список объектов с данными о файлах (без каталогов) в системном каталоге directory.
 * @param {string} directory
 * @return {Array.<{
 *   name: string,
 *   size: number
 * }>}
 */
TVIPStb.prototype.getDirectoryFiles = function(directory) {};


/**
 * см. TVIPStb.prototype.reset
 * Задать фильтры имен файлов для getDirectoryFiles и getDirectoryDirs. Фильтры разделяются символом |.
 * Можно использовать символы ? и *. Например: *.avi|*.mp3
 * @param {string} filters
 * @return {void}
 */
TVIPStb.prototype.setDirectoryListFilters = function(filters) {};


/**
 * Получить переменную из постоянного хранилища браузера. Если name не найден, вернется пустая строка.
 * @param {string} name
 * @return {string}
 */
TVIPStb.prototype.getEnvValue = function(name) {};


/**
 * Возвращает строку, содержащую основной MAC-адрес приставки. Обычно это MAC-адрес Ethernet.
 * @return {string}
 */
TVIPStb.prototype.getMainMacAddress = function() {};


/**
 * Возвращает список объектов смонтированных накопителей (локальных и сетевых).
 * Поля объекта:
 *   label - имя (метка) смонтированного ресурса для отображения пользователю;
 *   path - каталог, в который смонтирован ресурс;
 *   fstype - тип файловой системы (варианты: vfat, ntfs, ext2, ext3, nfs, cifs.
 * @return {Array.<{
 *   label: string,
 *   path: string,
 *   fstype: string
 * }>}
 */
TVIPStb.prototype.getStorageValues = function() {};


/**
 * Возвращает true, если в системной файловой системе существует каталог с именем osPath, иначе false.
 * @param {string} path
 * @return {boolean}
 */
TVIPStb.prototype.hasDirectory = function(path) {};


/**
 * Возвращает true, если в системной файловой системе существует файл (не каталог) с именем osPath, иначе false.
 * @param {string} path
 * @return {boolean}
 */
TVIPStb.prototype.hasFile = function(path) {};


/**
 * Запустить системные настройки Tvip.
 * @return {void}
 */
TVIPStb.prototype.launchPreferences = function() {};


/**
 * Выводит отладочное сообщение в системную консоль (Linux) или logcat (Android).
 * @param {string} message
 * @return {void}
 */
TVIPStb.prototype.logDebug = function(message) {};


/**
 * см. TVIPStb.prototype.reset
 * Установка цвета UI, который будет считаться прозрачным. color - цвет в формате RGB.
 * @param {number} color
 * @return {void}
 */
TVIPStb.prototype.setColorKey = function(color) {};


/**
 * см. TVIPStb.prototype.reset
 * Устанавливает HTTP-заголовок для будущих HTTP-запросов браузера.
 *      header - имя заголовка,
 *      value - значение заголовка.
 * Если value пустая строка, то удаляется ранее установленный заголовок.
 * @param {string} header
 * @param {string} value
 * @return {void}
 */
TVIPStb.prototype.setCustomHeader = function(header, value) {};


/**
 * Сохранить переменную в постоянном хранилище браузера. Все переменные доступны всем страницам браузера.
 * @param {string} name
 * @param {string} value
 * @return {void}
 */
TVIPStb.prototype.setEnvValue = function(name, value) {};


/**
 * Отобразить (show=true) или скрыть (show=false) виртуальную клавиатуру.
 * @param {boolean} show
 * @return {void}
 */
TVIPStb.prototype.showVirtualKeyboard = function(show) {};


/**
 * Сбросить настройки: прозрачного цвета; HTTP-заголовков; фильтра файлов
 * @return {void}
 */
TVIPStb.prototype.reset = function() {};


/**
 * НЕДОКУММЕНТИРОВАННЫЙ МЕТОД. ВЗЯТ ИЗ КОММЕНТА Владимира Манова https://vidimax.basecamphq.com/projects/12510569-tvip/todo_items/192245361/comments#comment_300846908
 * Для использования arescam достаточно писать TvipStb.execCommand("arescam параметры")
 * @param {string} command
 * @return {void}
 */
TVIPStb.prototype.execCommand = function(command) {};
