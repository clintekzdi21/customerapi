'use strict';

exports.validateLogin = function(req, res, next){

	req.checkBody('username', 'Please provide your Email').notEmpty();
	// req.checkBody('username', 'Email address needs to be in the format yourname@domain.com.').isEmail();
	req.checkBody('password', 'Please provide your Password').notEmpty();

	var errors = req.validationErrors();

    if (errors) {
        res.status(200).send(errors);
    } else {
        next();
    }
}
