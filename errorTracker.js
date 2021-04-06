var path = require('path');
var fs = require('fs');
var path = require('path');
var moment = require('moment');


exports.setErrorlogs = function setErrorlogs(message, functionName, linenumber, apitype, filename) {
    var dir = path.join(__dirname, "/errorlogs/apiErrorlogs.txt")

    var folderpath = path.join(__dirname, "/errorlogs");

    var ERRORtxt = "\n" + apitype + " ~ " + moment().tz('Australia/Sydney').format('YYYY-MM-DD HH:mm:ss') + " : " + functionName + " ~ " + filename + " - LINE : " + linenumber + " = " + message;

    if (!fs.existsSync(folderpath)) {
        fs.mkdirSync(folderpath);

        fs.writeFile(dir, ERRORtxt, function(err) {
            if (err) {
                console.log(err);
            } else {
                console.log('Operation Complete');
            }
        })
    } else {
        fs.appendFile(dir, ERRORtxt, function(err) {
            if (err) {
                console.log(err);
            } else {
                console.log('Operation Complete');
            }
        })
    }
};