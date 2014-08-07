# Logger.js - Wrapper around winston that provides logLevel update at runtime
Provides the missing updateLogLevel feature for Winston at runtime so you can adjust logging level live.
Note that the default logger provides two transports but you can configure it to your needs.
This is wrapper and does not alter Winston functionalities.
The setup requires you to expose the updateLogLevel service as such:
```
var express = require('express');

app.get('/updateLogLevel/:level', function (req, res) {
    logger.update(req.params.level);
    res.send(200, 'Update log level to: ' + req.params.level);
});
```

## USAGE
### browser -
      http://localhost/updateLogLevel/error // Will filter out anything less than an error
      http://localhost/updateLogLevel/warn // Will filter out anything less than a warning
      http://localhost/updateLogLevel/info // Will filter out anything less than an info
      http://localhost/updateLogLevel/debug // Will filter out anything less than a debug
### node.js -
      var Logger = require('./Logger');
      logger.log('debug', 'this is a debug message');   // Gets logged to transports
### example -
      You have setup your live environment and have checked that everything went fine through your debug logs.
      You are now considering removing the performance overhead. Simply go to:
      http://localhost/updateLogLevel/error
      Log level is now set to error only. Therefore, debug statement will not be logged anymore.

## Tests
npm install
npm test