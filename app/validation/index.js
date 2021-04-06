'use strict';

exports.validateRecipientBody = function(req, res, next) {

    req.checkBody('category_id', 'Error Message here').notEmpty();

    var errors = req.validationErrors();

    if (errors) {
        res.status(400).send(errors);
    } else {
        next();
    }
};
