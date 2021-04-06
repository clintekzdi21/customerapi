'use strict';

var isLoggedIn = function(req, res, next) {
    if (req.isAuthenticated()){
        return next();
    }else{
        res.send({return:true, msg: 'UnAuthorized'});
    }

};

var isAdmin = function(req, res, next){
    if(req.user){
        if(req.user.roleID.RoleType == "Administrator"){
            return next();
        }else {
            res.send({return:true, msg: 'UnAuthorized'});
        }
    }else{
        res.send({return:true, msg: 'UnAuthorized'});
    }
}

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Headers', 'Origin, Authorization, X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
    next();
};

var passKeyToReq = function(apiKey) {
    return function passKeyRequest(req, res, next) {
        req.apiKey = apiKey;
        next();
    };
};

exports.isLoggedIn = isLoggedIn;
exports.isAdmin = isAdmin;
exports.allowCrossDomain = allowCrossDomain;
exports.passKeyHandler = passKeyToReq;
