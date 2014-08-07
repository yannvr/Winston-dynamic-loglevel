var Logger = (function () {
    var logLevels = {
            debug: 0,
            info: 1,
            warn: 2,
            error: 3
        },
        currentLogLevel = logLevels.debug, // default log level. One of: debug, info, warn or error. Applied to transports File and Console
        winston = require('winston'),
        fs = require('fs'),
        logDir = (fs.existsSync('logs/') ? 'logs/' : './'),     // Log into "logs" dir if it exists
        json = false,   // JSON is required for querying logs. Useful for live.
        config = {
            levels: logLevels,
            colors: {
                debug: 'blue',
                info: 'green',
                warn: 'yellow',
                error: 'red'
            }
        },
        _logger = new (winston.Logger)({
            transports: [
                new (winston.transports.Console)({
                    colorize: true,
                    level: Object.keys(config.levels)[config.levels.debug]}),

                new (winston.transports.File)({
                    filename: logDir + 'log.txt',
                    json: json,
                    level: Object.keys(config.levels)[config.levels.debug],
                    maxsize: 1048576})      // 1MB
            ],
            levels: config.levels
        });

    // This must be exposed on the web server. See server.js
    function update(level) {
        this.currentLogLevel = config.levels[level];
    }

    // Wrap original loggers in order to filter log level according to the one we set dynamically
    function log() {
        if (config.levels[arguments[0]] >= this.currentLogLevel) {
            _logger.log.apply(_logger, arguments);
            return true;
        }
        return false;
    }

    function error() {
        _logger.error.apply(_logger, arguments);
    }

    return {log: log,
            error: error,
            updateLogLevel: update,
            currentLogLevel: currentLogLevel,
            logLevels: logLevels        // exposed for testing only
            }
})();


module.exports = Logger;