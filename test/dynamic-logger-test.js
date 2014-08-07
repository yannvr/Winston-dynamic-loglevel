var assert = require("assert"),
    logger = require('../lib/Logger');

describe('Logger', function(){
    describe('default log level()', function(){
        it('should set default log level to debug', function(){
            assert.equal(logger.logLevels.debug, logger.currentLogLevel)
        });

        it('should set log level to info', function(){
            logger.updateLogLevel('info');
            assert.equal(logger.logLevels.info, logger.currentLogLevel)
        });

        it('should not log below info level', function(){
            assert.equal(false, logger.log('debug', 'info log'));
        });

        it('should set log level to warn', function(){
            logger.updateLogLevel('warn');
            assert.equal(logger.logLevels.warn, logger.currentLogLevel)
        });

        it('should not log below warn level', function(){
            assert.equal(false, logger.log('info', 'warn log'));
        });

        it('should set log level to error', function(){
            logger.updateLogLevel('error');
            assert.equal(logger.logLevels.error, logger.currentLogLevel)
        });

        it('should not log below error level', function(){
            assert.equal(false, logger.log('warn', 'error log'));
        });
    })
});