'use strict';

var fs = require('fs');
var path = require('path');

module.exports = function(mongoose) {
    var schema = path.resolve(__dirname, '../schema');
    fs.readdirSync(schema).forEach(function onFile(file) {
        require('../schema/' + path.basename(file, '.js'))(mongoose);
    });
};
