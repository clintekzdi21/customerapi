'use strict';

process.env.TZ = 'UTC';

require('./config/env')();


var env = process.env.NODE_ENV || 'development',
    application = require('./config/application'),
    express = require('express'),
    bunyan = require('bunyan'),
    mysql = require('mysql'),
    passport = require('passport'),
    middleware = require('./app/utils/middleware'),
    config = require('./config/environment/' + env),
    CronJob = require('cron').CronJob,
    Database = require('./app/utils/database').Database,
    db = new Database(mysql, config),
    log = bunyan.createLogger({
        name: config.app_name
    }),
    http = require('http'),
    app = express(),
    server = http.createServer(app);

process.env.NODE_ENV = env;

require(application.utils + 'helper')(db, server, log, config);
require(application.config + 'express')(app, passport);
require(application.config + 'passport')(passport);
require(application.config + 'schedule')(CronJob);

/** ROUTES **/

require(application.routes)(app, passport, middleware.isLoggedIn, middleware.isAdmin);

module.exports = app;