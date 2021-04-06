'use strict';

var env = process.env.NODE_ENV || 'development';

var mysql = require('mysql');
var config = require('../../config/environment/' + env);
const { Client } = require('pg');
var Database = function() {
    var self = this;

    self.connect = function onConnect(callback) {
        const client = new Client({
            user: config.db_user,
            host: config.db_host,
            database: config.db_name,
            password: config.db_password,
            port: config.db_port
        });
        client
            .connect()
            .then(() => console.log('connected'))
            .catch(err => {
                console.error('connection error', err.stack);
                return callback(err.stack , false)
            })
            .then(() => { return callback(null, true); })
    };

    self.query = function onQuery(sql, params, callback) {
        const client = new Client({
            user: config.db_user,
            host: config.db_host,
            database: config.db_name,
            password: config.db_password,
            port: config.db_port
        });
        client.connect();
        let results = null;
        client
            .query(sql, params)
            .then(result => {
                if(result.rows.length > 0) {
                    results = result.rows;
                } else {
                    results = true;
                }
            })
            .catch(e => {
                return callback(e.stack , false)
            })
            .then(() => client.end())
            .then(() => { 
                return callback(null, results);
            })
    };
};


exports.Database = Database;
