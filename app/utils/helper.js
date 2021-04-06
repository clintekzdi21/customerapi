'use strict';

module.exports = function(database, server, log, config) {
    database.connect(function onConnect(err, isConnected) {
        if (!isConnected) {

            log.error('ENVIRONMENT: ' + config.env + ' Error Connecting To MYSQL database');
        } else {
            // server.listen(config.port, function connection(err) {
            //     if (err instanceof Error) {
            //         log.error('Unable to start Server', config.port);
            //     } else {
            //         log.info('Server started at ' + config.port + ' Using ' + config.api_version);
            //         // log.info('ENVIRONMENT: ' + config.env + ' Server started at PORT: ' + config.port + ' Using API VERSION: ' + config.api_version);
            //     }
            // });
            server.listen(process.env.PORT || config.port, function connection(err) {
                if (err instanceof Error) {
                    // errorHelper.setErrorlogs(err, 'onConnect', '14', 'API', 'helper.js'); // SET ERRORLOGS
                    log.error('ENVIRONMENT: ' + config.env + ' Unable to start Server', app.get('port'));
                } else {
                    // log.info('Server started at ' + app.get('port') + ' Using ' + app.get('api_version') + ' Environment: ' + app.get('env'));
                    log.info('ENVIRONMENT: ' + config.env + ' Server started at PORT: ' + config.port);
                }
            });
        }
    });
};
