'use strict';
var rp = require('request-promise');
var request = require('request');
var env = process.env.NODE_ENV || 'development';
var config = require('../../config/environment/' + env);
var Database = require('../../app/utils/database').Database;
var db = new Database();
var async = require('async');
var errorHelper = require('../../errorTracker');
var _ = require('lodash-node');


exports.getAllAffiliates = function getAllAffiliates(cb) {
    let data = {};
    
    data.refersion_public_key = config.refersion_public_key;
    data.refersion_secret_key = config.refersion_secret_key;
    request({
        url: 'https://www.refersion.com/api/list_affiliates',
        method: "POST",
        json: true, // <--Very important!!!
        body: data
    }, function(error, response, body) {
        if (error) {
            errorHelper.setErrorlogs(error, "getAllAffiliates", null, null, "requestHelper.js");
            cb(error, null);
        }
        
        cb(null, response.body.results);
    });
};

exports.CheckRefersionAPI = function CheckRefersionAPI(cb) {
    let data = {};
    data.refersion_public_key = config.refersion_public_key;
    data.refersion_secret_key = config.refersion_secret_key;

    request({
        url: 'https://www.refersion.com/api/check_account',
        method: "POST",
        json: true, // <--Very important!!!
        body: data
    }, function(error, response, body) {
        if (error) {
            errorHelper.setErrorlogs(error, "CheckRefersionAPI", null, null, "requestHelper.js");
            cb(error, null);
        }
        
        cb(null, response);
    });
};

exports.affiliateTracking = function affiliateTracking(data, cb) {
    request({
        url: 'https://www.refersion.com/tracker/v3/webhook',
        method: "POST",
        json: true, // <--Very important!!!
        body: data
    }, function(error, response, body) {
        if (error) {
            errorHelper.setErrorlogs(error, "affiliateTracking", null, null, "requestHelper.js");
            cb(error, null);
        }
        console.log('response', response.statusCode);
        cb(null, response.statusCode);
    });
};