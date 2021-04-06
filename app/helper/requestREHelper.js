var request = require('request');

var _ = require('lodash-node');
var async = require('async');
var errorHelper = require('../../errorTracker');
var mysql = require('mysql');
var parseString = require('xml2js').parseString;
var zlib = require('zlib');

var env = process.env.NODE_ENV || 'development';
var config = require('../../config/environment/' + env);
var Database = require('../../app/utils/database').Database;
var db = new Database();

var args = '<x:Envelope xmlns:x="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ret="http://retailexpress.com.au/">' +
    '<x:Header>' +
    '<ret:ClientHeader>' +
    '<ret:ClientID>9bf6dd42-35b9-46dd-948a-1c3c91906caa</ret:ClientID>' +
    '<ret:UserName>wsi</ret:UserName>' +
    '<ret:Password>wsipass</ret:Password>' +
    '</ret:ClientHeader>' +
    '</x:Header>' +
    '<x:Body>' +
    '<ret:CustomerGetDetails>' +
    '<ret:CustomerId>1</ret:CustomerId>' +
    '</ret:CustomerGetDetails>' +
    '</x:Body>' +
    '</x:Envelope>';

var xml = '<x:Envelope xmlns:x="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ret="http://retailexpress.com.au/">' +
    '<x:Header>' +
    '<ret:ClientHeader>' +
    '<ret:ClientID>9bf6dd42-35b9-46dd-948a-1c3c91906caa</ret:ClientID>' +
    '<ret:UserName>wsi</ret:UserName>' +
    '<ret:Password>wsipass</ret:Password>' +
    '</ret:ClientHeader>' +
    '</x:Header>' +
    '<x:Body>' +
    '<ret:GetProducts>' +
    '<ret:lastUpdated>2017-06-23T00:00:00</ret:lastUpdated>' +
    '</ret:GetProducts>' +
    '</x:Body>' +
    '</x:Envelope>';

var xmlBody = '<x:Envelope xmlns:x="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ret="http://retailexpress.com.au/">' +
    '<x:Header>' +
    '<ret:ClientHeader>' +
    '<ret:ClientID>a2ac39f8-56b7-45f8-82cd-f8c75a9ff3a5</ret:ClientID>' +
    '<ret:UserName>220</ret:UserName>' +
    '<ret:Password>0210</ret:Password>' +
    '</ret:ClientHeader>' +
    '</x:Header>' +
    '<x:Body>' +
    '<ret:ProductsGetBulkDetailsByChannel>' +
    '<ret:LastUpdated>2017-07-31T00:00:00</ret:LastUpdated>' +
    '<ret:ChannelId>0</ret:ChannelId>' +
    '</ret:ProductsGetBulkDetailsByChannel>' +
    '</x:Body>' +
    '</x:Envelope>';

function requestGetProductsFromRE(data) {
    request({
        uri: "http://v2wsisandbox.retailexpress.com.au/dotnet/admin/webservices/v2/inventoryplanning/inventoryplanningservice.asmx",
        // uri: "http://v2wsisandbox.retailexpress.com.au/dotnet/admin/webservices/v2/wms/service.asmx",
        method: "POST",
        headers: {
            'Content-Type': 'text/xml;charset=utf-8',
        },
        body: args
    }, function(error, response, body) {
        // console.log(response.statusCode);
        console.log(body);
        // console.log(error);
        // zlib.gunzip(body, function(err, dezipped) {            
        //     console.log('dezipped', dezipped);
        // });
        parseString(body, function(err, result) {
            cb(null, result);
        });
    });
};

function requestGetStocksByOutletFromRE() {
    request({
        uri: "http://v2wsisandbox.retailexpress.com.au/dotnet/admin/webservices/v2/inventoryplanning/inventoryplanningservice.asmx",
        // uri: "http://v2wsisandbox.retailexpress.com.au/dotnet/admin/webservices/v2/wms/service.asmx",
        method: "POST",
        headers: {
            'Content-Type': 'text/xml;charset=utf-8',
        },
        body: args
    }, function(error, response, body) {
        // console.log(response.statusCode);
        console.log(body);
        // console.log(error);
        // zlib.gunzip(body, function(err, dezipped) {            
        //     console.log('dezipped', dezipped);
        // });
        parseString(body, function(err, result) {
            cb(null, result);
        });
    });
};

function requestGetOutlets() {
    request({
        uri: "http://v2wsisandbox.retailexpress.com.au/dotnet/admin/webservices/v2/inventoryplanning/inventoryplanningservice.asmx",
        // uri: "http://v2wsisandbox.retailexpress.com.au/dotnet/admin/webservices/v2/wms/service.asmx",
        method: "POST",
        headers: {
            'Content-Type': 'text/xml;charset=utf-8',
        },
        body: args
    }, function(error, response, body) {
        // console.log(response.statusCode);
        console.log(body);
        // console.log(error);
        // zlib.gunzip(body, function(err, dezipped) {            
        //     console.log('dezipped', dezipped);
        // });
        parseString(body, function(err, result) {
            cb(null, result);
        });
    });
};

exports.productsGetBulkDetails = function productsGetBulkDetails(cb) {

    var gzip = new chilkat.Gzip();
    request({
        uri: "http://fitnutritionfix.retailexpress.com.au/dotnet/admin/webservices/v2/webstore/service.asmx",
        // uri: "http://v2wsisandbox.retailexpress.com.au/dotnet/admin/webservices/v2/wms/service.asmx",
        method: "POST",
        headers: {
            'Content-Type': 'text/xml;charset=utf-8',
        },
        body: xmlBody
    }, function(error, response, body) {
        
    });

};