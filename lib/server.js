var express = require('express'),
    logger = require('./Logger'),
    app = express(),
    port = 8080;

// OPTIONAL INPUT VALIDATION
app.param(function (name, fn) {
    if (fn instanceof RegExp) {
        return function (req, res, next, val) {
            var captures;
            if (captures = fn.exec(String(val))) {
                req.params[name] = captures[0];
                next();
            } else {
                next('route');
            }
        }
    }
});

app.param('command', /debug|info|warn|error/i);
// END OF OPTIONAL INPUT VALIDATION

app.get('/updateLogLevel/:level', function (req, res) {
    if (!(req.params.level )) {
        res.send(500, 'Missing level parameter. Use one of debug, info, warn or error.');
    } else {
        logger.update(req.params.level);
        res.send(200, 'Update log level to: ' + req.params.level);
    }
});

try {
    app.listen(port);
    logger.log("info", "Server listening on port: %s", port);
} catch(e) {
    logger.error(e.message)
}