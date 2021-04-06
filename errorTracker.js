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

exports.saveTransactionSuccesslogs = function setErrorlogs(order_number, email, shipping_label, status) {
    var dir = path.join(__dirname, "/errorlogs/TransactionSuccesslogs.txt")

    var folderpath = path.join(__dirname, "/errorlogs");

    var LOGtxt = "\n" + " --- " + moment().tz('Australia/Sydney').format('YYYY-MM-DD HH:mm:ss') + " : " + order_number + " Email: " + email + " " + shipping_label + " " + status;

    if (!fs.existsSync(folderpath)) {
        fs.mkdirSync(folderpath);

        fs.writeFile(dir, LOGtxt, function(err) {
            if (err) {
                console.log(err);
            } else {
                console.log('Operation Complete');
            }
        })
    } else {
        fs.appendFile(dir, LOGtxt, function(err) {
            if (err) {
                console.log(err);
            } else {
                console.log('Operation Complete');
            }
        })
    }
};

exports.setOrderLogs = function setOrderLogs(data, order_id, status) {
    var dir = path.join(__dirname, "/public/logs/orderLogx.txt")

    var folderpath = path.join(__dirname, "/public/logs");
    var LOGtxt = "\n" + " --- " + moment().tz('Australia/Sydney').format('YYYY-MM-DD HH:mm:ss') + " : " + JSON.stringify(data) + " ~ ~ " + "Order ID: " + order_id + " ~ ~ Status : " + status;

    //var LOGtxt = "\n" + " --- " + moment().format('YYYY-MM-DD HH:mm:ss') + " : " + "Order ID: " + oder_id + " ~ ~ Status : " + status;

    if (!fs.existsSync(folderpath)) {
        fs.mkdirSync(folderpath);

        fs.writeFile(dir, LOGtxt, function(err) {
            if (err) {
                console.log(err);
            } else {
                console.log('Operation Complete');
            }
        })
    } else {
        fs.appendFile(dir, LOGtxt, function(err) {
            if (err) {
                console.log(err);
            } else {
                console.log('Operation Complete');
            }
        })
    }
};

exports.setSynclogs = function setSynclogs() {
    var dir = path.join(__dirname, "/errorlogs/apiSynclogs.txt")

    var folderpath = path.join(__dirname, "/errorlogs");

    var ERRORtxt = moment().format('YYYY-MM-DD HH:mm:ss');

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
        fs.writeFile(dir, ERRORtxt, function(err) {
            if (err) {
                console.log(err);
            } else {
                console.log('Operation Complete');
            }
        })
    }
};

exports.getSynclogs = function getSynclogs(cb) {
    var dir = path.join(__dirname, "/errorlogs/apiSynclogs.txt")

    var content;
    // First I want to read the file
    fs.readFile(dir, { encoding: "utf8" }, function(err, data) {
        if (err) {
            console.log(err)
        }
        cb(null, data);
    })
};

exports.setSessionKey = function setSessionKey(key) {
    var dir = path.join(__dirname, "/errorlogs/apiSessionKey.txt")

    var folderpath = path.join(__dirname, "/errorlogs");

    var ERRORtxt = moment().format('YYYY-MM-DD HH:mm:ss');

    if (!fs.existsSync(folderpath)) {
        fs.mkdirSync(folderpath);

        fs.writeFile(dir, key, function(err) {
            if (err) {
                console.log(err);
            } else {
                console.log('Operation Complete');
            }
        })
    } else {

        fs.writeFile(dir, key, function(err) {
            if (err) {
                console.log(err);
            } else {
                console.log('Operation Complete');
            }
        })
    }
};

exports.getSessionKey = function getSessionKey(cb) {
    var dir = path.join(__dirname, "/errorlogs/apiSessionKey.txt")

    var content;
    // First I want to read the file
    fs.readFile(dir, { encoding: "utf8" }, function(err, data) {
        if (err) {
            console.log(err)
        }
        cb(null, data);
    })
};

exports.setOverdoseSynclogs = function setOverdoseSynclogs() {
    var dir = path.join(__dirname, "/errorlogs/apiOverdoseSynclogs.txt");

    var folderpath = path.join(__dirname, "/errorlogs");

    var CurrentDate = moment().tz('Australia/Sydney').unix();

    if (!fs.existsSync(folderpath)) {
        fs.mkdirSync(folderpath);

        fs.writeFile(dir, CurrentDate, function(err) {
            if (err) {
                console.log(err);
            } else {
                console.log('Operation Complete');
            }
        })
    } else {
        fs.writeFile(dir, CurrentDate, function(err) {
            if (err) {
                console.log(err);
            } else {
                console.log('Operation Complete');
            }
        })
    }
};

exports.getOverdoseSynclogs = function getOverdoseSynclogs(cb) {
    var dir = path.join(__dirname, "/errorlogs/apiOverdoseSynclogs.txt");

    var content;
    // First I want to read the file
    fs.readFile(dir, { encoding: "utf8" }, function(err, data) {
        if (err) {
            console.log(err)
        }
        cb(null, data);
    })
};

exports.setOverdoseProductImgSynclogs = function setOverdoseProductImgSynclogs() {
    var dir = path.join(__dirname, "/errorlogs/apiProductImagesSynclogs.txt");

    var folderpath = path.join(__dirname, "/errorlogs");

    var CurrentDate = moment().unix();

    if (!fs.existsSync(folderpath)) {
        fs.mkdirSync(folderpath);

        fs.writeFile(dir, CurrentDate, function(err) {
            if (err) {
                console.log(err);
            } else {
                console.log('Operation Complete');
            }
        })
    } else {
        fs.writeFile(dir, CurrentDate, function(err) {
            if (err) {
                console.log(err);
            } else {
                console.log('Operation Complete');
            }
        })
    }
};

exports.getOverdoseProductImgSynclogs = function getOverdoseProductImgSynclogs(cb) {
    var dir = path.join(__dirname, "/errorlogs/apiOverdoseSynclogs.txt");

    var content;
    // First I want to read the file
    fs.readFile(dir, { encoding: "utf8" }, function(err, data) {
        if (err) {
            console.log(err)
        }
        cb(null, data);
    })
};

exports.setKioskRestartlogs = function setKioskRestartlogs() {
    var dir = path.join(__dirname, "/errorlogs/kioskRestartlogs.txt")

    var folderpath = path.join(__dirname, "/errorlogs");

    var ERRORtxt = moment().format('YYYY-MM-DD HH:mm:ss');

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
        fs.writeFile(dir, ERRORtxt, function(err) {
            if (err) {
                console.log(err);
            } else {
                console.log('Operation Complete');
            }
        })
    }
};

exports.getKioskRestartlogs = function getKioskRestartlogs(cb) {
    var dir = path.join(__dirname, "/errorlogs/kioskRestartlogs.txt");

    var content;
    // First I want to read the file
    fs.readFile(dir, { encoding: "utf8" }, function(err, data) {
        if (err) {
            console.log(err)
        }
        cb(null, data);
    })
};

// exports.setoverAllLogs = function setoverAllLogs(synctype, status) {
//     var dir = path.join(__dirname, "/errorlogs/overAllLogx.txt")

//     var folderpath = path.join(__dirname, "/errorlogs");

//     var LOGtxt = "\n" + " --- " + moment().format('YYYY-MM-DD HH:mm:ss') + " : " + synctype + " ~ ~ ~ success : " + status;

//     if (!fs.existsSync(folderpath)) {
//         fs.mkdirSync(folderpath);

//         fs.writeFile(dir, LOGtxt, function(err) {
//             if (err) {
//                 console.log(err);
//             } else {
//                 console.log('Operation Complete');
//             }
//         })
//     } else {
//         fs.appendFile(dir, LOGtxt, function(err) {
//             if (err) {
//                 console.log(err);
//             } else {
//                 console.log('Operation Complete');
//             }
//         })
//     }
// };

exports.setoverAllLogs = function setoverAllLogs(synctype, sku, status) {
    var dir = path.join(__dirname, "/public/logs/overAllLogx.txt")

    var folderpath = path.join(__dirname, "/public/logs");

    var LOGtxt = "\n" + " --- " + moment().tz('Australia/Sydney').format('YYYY-MM-DD HH:mm:ss') + " : " + synctype + " SKU: " + sku + " ~ ~ success : " + status;

    if (!fs.existsSync(folderpath)) {
        fs.mkdirSync(folderpath);

        fs.writeFile(dir, LOGtxt, function(err) {
            if (err) {
                console.log(err);
            } else {
                console.log('Operation Complete');
            }
        })
    } else {
        fs.appendFile(dir, LOGtxt, function(err) {
            if (err) {
                console.log(err);
            } else {
                console.log('Operation Complete');
            }
        })
    }
};

exports.setDisabledLogs = function setDisabledLogs(synctype, sku, status) {
    var dir = path.join(__dirname, "/public/logs/disabledLogx.txt")

    var folderpath = path.join(__dirname, "/public/logs");

    var LOGtxt = "\n" + " --- " + moment().tz('Australia/Sydney').format('YYYY-MM-DD HH:mm:ss') + " : " + synctype + " SKU: " + sku + " ~ ~ success : " + status;

    if (!fs.existsSync(folderpath)) {
        fs.mkdirSync(folderpath);

        fs.writeFile(dir, LOGtxt, function(err) {
            if (err) {
                console.log(err);
            } else {
                console.log('Operation Complete');
            }
        })
    } else {
        fs.appendFile(dir, LOGtxt, function(err) {
            if (err) {
                console.log(err);
            } else {
                console.log('Operation Complete');
            }
        })
    }
};

exports.removeProdLogs = function removeProdLogs(synctype, sku, status) {
    var dir = path.join(__dirname, "/public/logs/removeProdLogx.txt")

    var folderpath = path.join(__dirname, "/public/logs");

    var LOGtxt = "\n" + " --- " + moment().tz('Australia/Sydney').format('YYYY-MM-DD HH:mm:ss') + " : " + synctype + " SKU: " + sku + " ~ ~ success : " + status;

    if (!fs.existsSync(folderpath)) {
        fs.mkdirSync(folderpath);

        fs.writeFile(dir, LOGtxt, function(err) {
            if (err) {
                console.log(err);
            } else {
                console.log('Operation Complete');
            }
        })
    } else {
        fs.appendFile(dir, LOGtxt, function(err) {
            if (err) {
                console.log(err);
            } else {
                console.log('Operation Complete');
            }
        })
    }
};

exports.setProductLogs = function setProductLogs(synctype, sku, status, data) {
    let filname = 'Product_' + moment().tz('Australia/Sydney').format('YYYY-MM-DD') + '.txt';
    var dir = path.join(__dirname, "/public/logs/product/" + filname);

    var folderpath = path.join(__dirname, "/public/logs/product");

    var LOGtxt = "\n" + " --- " + moment().tz('Australia/Sydney').format('YYYY-MM-DD HH:mm:ss') + " : " + synctype + " SKU: " + sku + " synctype : " + status + "data => " + JSON.stringify(data);

    if (!fs.existsSync(folderpath)) {
        fs.mkdirSync(folderpath);

        fs.writeFile(dir, LOGtxt, function(err) {
            if (err) {
                console.log(err);
            } else {
                console.log('Operation Complete');
            }
        })
    } else {
        fs.appendFile(dir, LOGtxt, function(err) {
            if (err) {
                console.log(err);
            } else {
                console.log('Operation Complete');
            }
        })
    }
};

exports.getoverAllLogs = function getoverAllLogs(cb) {
    var dir = path.join(__dirname, "/errorlogs/overAllLogx.txt");

    var content;
    // First I want to read the file
    fs.readFile(dir, { encoding: "utf8" }, function(err, data) {
        if (err) {
            console.log(err)
        }
        cb(null, data);
    })
};

exports.setKioskBuild = function setKioskBuild(app_name, app_version, app_build) {
    var dir = path.join(__dirname, "/errorlogs/kiosk.json")

    var folderpath = path.join(__dirname, "/errorlogs");

    var LOGtxt = {
        app_name: app_name,
        app_version: app_version,
        app_build: app_build
    };

    if (!fs.existsSync(folderpath)) {
        fs.mkdirSync(folderpath);

        fs.writeFile(dir, JSON.stringify(LOGtxt), function(err) {
            if (err) {
                console.log(err);
            } else {
                console.log('Operation Complete');
            }
        })
    } else {
        fs.writeFile(dir, JSON.stringify(LOGtxt), function(err) {
            if (err) {
                console.log(err);
            } else {
                console.log('Operation Complete');
            }
        })
    }
};

exports.getKioskBuild = function getKioskBuild(cb) {
    var dir = path.join(__dirname, "/errorlogs/kiosk.json");

    var content;
    // First I want to read the file
    fs.readFile(dir, { encoding: "utf8" }, function(err, data) {
        if (err) {
            console.log(err)
        }
        cb(null, data);
    })
};

exports.setKioskWatcher = function setKioskWatcher(app_name, app_version, app_build) {
    var dir = path.join(__dirname, "/errorlogs/watcher.json")

    var folderpath = path.join(__dirname, "/errorlogs");

    var LOGtxt = {
        app_name: app_name,
        app_version: app_version,
        app_build: app_build
    };

    if (!fs.existsSync(folderpath)) {
        fs.mkdirSync(folderpath);

        fs.writeFile(dir, JSON.stringify(LOGtxt), function(err) {
            if (err) {
                console.log(err);
            } else {
                console.log('Operation Complete');
            }
        })
    } else {
        fs.writeFile(dir, JSON.stringify(LOGtxt), function(err) {
            if (err) {
                console.log(err);
            } else {
                console.log('Operation Complete');
            }
        })
    }
};

exports.getKioskWatcher = function getKioskWatcher(cb) {
    var dir = path.join(__dirname, "/errorlogs/watcher.json");

    var content;
    // First I want to read the file
    fs.readFile(dir, { encoding: "utf8" }, function(err, data) {
        if (err) {
            console.log(err)
        }
        cb(null, data);
    })
};

//=== for kiosk log ====

exports.setKioskLog = function setKioskLog(data) {

    var dir = path.join(__dirname, "/public/logs/kiosklog.txt")

    var folderpath = path.join(__dirname, "/public/logs");

    var LOGtxt = "\n" + data.logstring + "\n" + "=============================================== *KIOSK LOG* ===============================================";

    if (!fs.existsSync(folderpath)) {
        fs.mkdirSync(folderpath);
        fs.writeFile(dir, LOGtxt, function(err) {
            if (err) {
                console.log(err);
            } else {
                console.log('Operation Complete');
            }
        })
    } else {
        fs.appendFile(dir, LOGtxt, function(err) {
            if (err) {
                console.log(err);
            } else {
                console.log('Operation Complete');
            }
        })
    }
};

exports.writeProducts = function writeProducts(data) {
    let flname = 'ProductList_' + moment().tz('Australia/Sydney').format('YYYY-MM-DD') + '.txt';
    var dir = path.join(__dirname, "/public/logs/inventory/" + flname);

    var folderpath = path.join(__dirname, "/public/logs/inventory");

    var LOGtxt = "\n" + JSON.stringify(data);

    if (!fs.existsSync(folderpath)) {
        fs.mkdirSync(folderpath);

        fs.writeFile(dir, LOGtxt, function(err) {
            if (err) {
                console.log(err);
            } else {
                console.log('Operation Complete');
            }
        })
    } else {
        fs.appendFile(dir, LOGtxt, function(err) {
            if (err) {
                console.log(err);
            } else {
                console.log('Operation Complete');
            }
        })
    }
};

exports.getwriteProducts = function getwriteProducts(cb) {
    var dir = path.join(__dirname, "/public/logs/ProductList.txt");

    var content;
    // First I want to read the file
    fs.readFile(dir, { encoding: "utf8" }, function(err, data) {
        if (err) {
            console.log(err)
        }
        cb(null, data);
    })
};

exports.getPacFile = function getPacFile(cb) {
    var dir = path.join(__dirname, "/errorlogs/proxy.pac");

    var content;
    // First I want to read the file
    fs.readFileSync(dir, function(err, data) {
        if (err) {
            console.log(err)
        }     
        console.log(data)   
        //cb(null, data);
    })
};