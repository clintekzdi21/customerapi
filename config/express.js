'use strict';

var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
require('body-parser-xml')(bodyParser);

var cookieParser = require('cookie-parser');
var methodOverride = require('method-override');
var session = require('express-session');
var middleware = require('../app/utils/middleware');
var expressValidator = require('express-validator');
var customValidator = require('../app/validator/')(expressValidator);
var path = require('path');
var range = require('express-range');

// var MongoStore = require('connect-mongo')(session);

module.exports = function(app, passport) {
    // console.log()
    app.use('/public', express.static(__dirname + './../public'));
    // app.use('/dist', express.static(__dirname + './../dist'));
    app.set('port', process.env.APP_PORT || 3000);
    app.set('api_version', process.env.APP_VER || '/api/v1');
    app.set('view engine', 'ejs');
    app.set('views', 'app/view/');
    // app.set('views', 'dist'); 
    app.use(range({
        accept: 'bytes'
    }));
    app.use(morgan('dev'));
    app.use(methodOverride());
    app.use(cookieParser());
    app.use(bodyParser.json({
        type: 'application/json',
        limit: '50mb'
    }));
    app.use(bodyParser.raw({
        type: 'application/xml',
        limit: '50mb'
    }));
    app.use(bodyParser.urlencoded({
        extended: true,
        limit: '50mb' 
    }));
    // app.use(bodyParser.urlencoded({
    //     extended: true,
    //     parameterLimit: 10000,
    //     limit: 1024 * 1024 * 10
    // }));
    app.use(session({
        secret: '3rdLayerAPI',
        resave: true,
        saveUninitialized: true,
        rolling: true,
        cookie: {
            maxAge: 3600000
            // maxAge: 10000
        }
        // cookie: { maxAge: 10000 }
        // store: new MongoStore({mongooseConnection:mongoose.connection,autoRemove: 'native',clear_interval: 3600000})
    }));

    app.use(passport.initialize());
    app.use(passport.session());
    app.use(middleware.allowCrossDomain);
    app.use(expressValidator());
    app.use(bodyParser.xml());
    // app.use(multer({
    //     rename: function(fieldname, filename) {
    //         return filename.replace(/\W+/g, '-').toLowerCase();
    //     }
    // }));
}