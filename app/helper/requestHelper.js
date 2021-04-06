'use strict';
var rp = require('request-promise');
var request = require('request');
var env = process.env.NODE_ENV || 'development';
var moment = require('moment');
var moment = require('moment-timezone');
var config = require('../../config/environment/' + env);
var Monitor = require('ping-monitor');
var mysql = require('mysql');
var Database = require('../../app/utils/database').Database;
var db = new Database();
var async = require('async');
var errorHelper = require('../../errorTracker');
var _ = require('lodash-node');

var emailDao = require('../daos/emailDao');

// var myWebsite = new Monitor({
//     website: 'https://staging.shippit.com',
//     interval: 1
// });

// myWebsite.on('up', function(res) {
//     console.log('Yay!! ' + res.website + ' is up.');
//     me.checkSyncDataHelper();
// });

// myWebsite.on('down', function(res) {
//     console.log('Oh Snap!! ' + res.website + ' is down! ' + res.statusMessage);
// });
// myWebsite.on('error', function(res) {
//     console.log('Oh Snap!! An unexpected error occured trying to load ' + res.website + '!');
//     myWebsite.stop();
// });

exports.RequestHelperShippit = function RequestHelperShippit(code, cb) {
    request({
        //uri: HOST + VERSION + routes[1] + "?accesskey=" + code,
        uri: 'https://staging.shippit.com/api/3/merchant?auth_token=' + config.shippit_api_key,
        method: "GET",
        timeout: 300000,
        followRedirect: true,
        maxRedirects: 10
    }, function(error, response, body) {
        if (error) {
            cb(error, null);
        }
        cb(null, response);
    });
};

function requesterOrder(data, cb) {
    request({
        url: 'https://staging.shippit.com/api/3/orders?auth_token=' + config.shippit_api_key,
        method: "POST",
        json: true, // <--Very important!!!
        body: JSON.parse(data)
    }, function(error, response, body) {
        if (error) {
            errorHelper.setErrorlogs(err, "requesterOrder", null, null, "requestHelper.js");
            //cb(null, response.body);
        }
        cb(null, response);
    });
};

function requesterQuote(data, cb) {

    _.each(data, function(row, index) {
        request({
            url: 'https://staging.shippit.com/api/3/quotes?auth_token=' + config.shippit_api_key,
            method: "POST",
            json: true, // <--Very important!!!
            body: JSON.parse(row)
        }, function(error, response, body) {
            if (error) {
                errorHelper.setErrorlogs(err, "requesterQuote", null, null, "requestHelper.js");
            }

            if (index == data.length - 1) {
                cb(null, response);
            }
        });
    });

};

function getShippingFee(cb) {
    let sql = mysql.format('SELECT rate FROM rate_settings where rate_setting_id = 2');

    db.query(sql, function(err, resp) {
        if (err) {
            errorHelper.setErrorlogs(err, "getAllRateSettings", null, null, "kioskDao.js");
        }
        resp = resp[0];
        cb(null, resp);
    });
};

exports.checkSyncDataHelper = function checkSyncDataHelper(next) {

    async.waterfall([
        function(callback) {
            let sql = mysql.format('SELECT shipping_id, delivery_address, delivery_postcode, delivery_city, delivery_suburb, delivery_state, delivery_country, delivery_instructions, authority_to_leave,' +
                ' receiver_contact_number, receiver_name, discount, discount_type, discount_percentage, order_id, courier_type FROM shipping_info where sync_date is null');
     
            db.query(sql, function(err, response) {
                if (err) {
                    errorHelper.setErrorlogs(err, "getPerson", null, null, "requestHelper.js");
                    callback(err, null);
                }

                if (response.length == 0) {
                    next(null, 'No data to sync');
                } else {                    
                    _.each(response, function(row) {
                        if(row.courier_type == 'click_and_collect' ) {
                            row.courier_type = true;
                        } else {
                            row.courier_type = false;
                        }                        
                    });                    
                    callback(null, response);
                }

            });
        },
        function(ship_info, callback) {
            let sql = mysql.format('SELECT shipping_id, sender_email, sender_firstname, sender_lastname, sender_contact_number FROM shipping_info where sync_date is null');

            db.query(sql, function(err, response) {
                if (err) {
                    errorHelper.setErrorlogs(err, "getPerson", null, null, "requestHelper.js");
                    callback(err, null);
                }

                callback(null, ship_info, response);
            });
        },
        function(ship_info, user, callback) {
            var arrOrder = [];
            var arrQuote = [];
            let strSQL = mysql.format('SELECT * FROM shipping_parcel_attribute');
            db.query(strSQL, function(err, response) {
                if (err) {
                    callback(err, null);
                }

                _.each(ship_info, function(row) {
                    row.parcel_attribute = _.filter(response, { 'shipping_id': row.shipping_id });
                    row.user_attributes = _.find(user, { shipping_id: row.shipping_id });

                    let OBJInnerOrder = {};
                    let OBJOuterOrder = {};
                    let ARROuter = [];
                    let quoteArrOrder = [];
                    let innerArr = {};
                    let quoteArr = {};
                    let quoteDet = {};
                    let CurrentDate = moment().format('YYYY-MM-DD HH:mm');
                    var a = moment.tz(CurrentDate, "Asia/Manila");
                    // console.log('a', a.tz("Australia/Sydney").format('YYYY-MM-DD'));

                    OBJInnerOrder.courier_type = "standard";
                    OBJInnerOrder.delivery_address = row.delivery_address;
                    OBJInnerOrder.delivery_postcode = row.delivery_postcode;
                    OBJInnerOrder.delivery_city = row.delivery_city;
                    OBJInnerOrder.delivery_state = row.delivery_state;
                    OBJInnerOrder.delivery_suburb = row.delivery_suburb;
                    OBJInnerOrder.delivery_country = row.delivery_country;
                    OBJInnerOrder.delivery_instructions = row.delivery_instructions;
                    OBJInnerOrder.authority_to_leave = row.authority_to_leave;
                    OBJInnerOrder.receiver_name = row.receiver_name;
                    OBJInnerOrder.receiver_contact_number = row.receiver_contact_number;

                    quoteDet.dropoff_postcode = row.delivery_postcode;
                    quoteDet.dropoff_state = row.delivery_state;
                    quoteDet.dropoff_suburb = row.delivery_city;

                    _.each(row.parcel_attribute, function(inneRow) {
                        let ARRInner = {};
                        let QuoteInner = {};
                        ARRInner.price = inneRow.price;
                        ARRInner.qty = inneRow.quantity;
                        ARRInner.title = inneRow.title;
                        ARROuter.push(ARRInner);
                        QuoteInner.qty = inneRow.quantity;
                        quoteArrOrder.push(QuoteInner);
                    });

                    innerArr.email = row.user_attributes.sender_email;
                    innerArr.first_name = row.user_attributes.sender_firstname;
                    innerArr.last_name = row.user_attributes.sender_lastname;
                    innerArr.contact_number = row.user_attributes.sender_contact_number;

                    OBJInnerOrder.parcel_attributes = ARROuter;
                    OBJInnerOrder.user_attributes = innerArr;
                    OBJOuterOrder['order'] = OBJInnerOrder;
                    quoteDet.parcel_attributes = quoteArrOrder;
                    quoteArr['quote'] = quoteDet;

                    arrOrder.push(JSON.stringify(OBJOuterOrder));
                    arrQuote.push(JSON.stringify(quoteArr));
                });
                console.log('ship_info', ship_info);
                let count = 0;
                async.eachSeries(arrOrder, function(row, cb) {
                    requesterOrder(row, function(err, response) {
                        if (response.statusCode == 200) {

                            ship_info[count].shippit_tracknumber = response.body.response.tracking_number;
                            getShippingFee(function(err, res) {
                                ship_info[count].shippit_fee = res.rate;
                                emailDao.sendFailTrans(ship_info[count], function(err, resp) {
                                    if (err) {
                                        errorHelper.setErrorlogs(err, "email", null, null, "referralDao.js");
                                        callback(err, null);
                                    }
                                    count++;
                                    if (count == arrOrder.length) {
                                        callback(null, ship_info);
                                    }
                                    cb(null, true);
                                });
                            });
                        } else {
                            next(response.body, null);
                        }
                    });
                });
            });
        },
        function(ship_info, callback) {
            let CurrentDate = moment().format();
            _.each(ship_info, function(row, index) {
                let sql = mysql.format('UPDATE shipping_info SET sync_date=? where shipping_id=?', [CurrentDate, row.shipping_id]);
                db.query(sql, function(err, resp) {
                    if (err) {
                        callback(err, null);
                    }
                    if (index == ship_info.length - 1) {
                        next(null, 'Success sync to cloud shippit.');
                    }
                });
            });
        }
    ]);
};

exports.RequestHelperOrder = function RequestHelperOrder(data, cb) {

    request({
        url: 'https://staging.shippit.com/api/3/orders?auth_token=' + config.shippit_api_key,
        method: "POST",
        json: true, // <--Very important!!!
        body: data
    }, function(error, response, body) {
        if (error) {
            errorHelper.setErrorlogs(err, "RequestHelperOrder", null, null, "requestHelper.js");
            cb(error, null);
        }

        cb(null, response);
    });
};

exports.RequestHelperQuote = function RequestHelperQuote(data, cb) {

    request({
        url: 'https://staging.shippit.com/api/3/quote?auth_token=' + config.shippit_api_key,
        method: "POST",
        json: true, // <--Very important!!!
        body: data
    }, function(error, response, body) {
        if (error) {
            errorHelper.setErrorlogs(err, "RequestHelperQuote", null, null, "requestHelper.js");
            cb(error, null);
        }
        // console.log('response', response);
        cb(null, response);
    });
};

exports.xml2Json = function xml2Json(data, next) {
    console.log('data', data);
    var parseString = require('xml2js').parseString;
    var xml = "<Products><Product><SKU>9332809361350</SKU><Short_Description>PRODUCT ONE</Short_Description><UOM /><ShippingCubic>0.0000</ShippingCubic><Weight>1.0000</Weight><SupersededItemCode /><SupersededItemFactor /><SupersededItemInterchangeable /><Product_ID>124007</Product_ID></Product><Product><SKU>9332809361367</SKU><Short_Description>PRODUCT TWO</Short_Description><UOM /><ShippingCubic>0.0000</ShippingCubic><Weight>1.0000</Weight><SupersededItemCode /><SupersededItemFactor /><SupersededItemInterchangeable /><Product_ID>124008</Product_ID></Product></Products>"
    // var xml = data;
    parseString(xml, function(err, result) {
        console.log('result', result);
        // next(null, result);
    });
};