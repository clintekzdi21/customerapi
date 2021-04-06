const moment = require('moment');
const Database = require('../../app/utils/database').Database;
const db = new Database();
const async = require('async');

exports.saveRecipient = function saveRecipient(data, next) {
    async.eachSeries(data.customer_id, function(val, cb) {
        let sql = 'SELECT * FROM recipients where customer_id = $1';
            let params = [val];
            db.query(sql, params, function(err, response) {
                if (err) {
                    next(err, null);
                } else {
                    //next(null, response);
                    let str = null;
                    let parameter = null;
                    let updateAt = moment().format('YYYY-MM-DD HH:mm:ss');
                    if(response.length > 0) {
                        response = response[0];
                        parameter = [data.category_id, updateAt, response.recipient_id]
                        str = 'UPDATE recipients set category_id = $1, date_updated = $2 where recipient_id  = $3';

                    } else {
                        parameter = [data.category_id, val, data.created_by]
                        str = 'INSERT INTO recipients (category_id, customer_id, created_by) VALUES ($1, $2, $3)';

                    }

                    db.query(str, parameter, (e, resp) => {
                        if(e) {
                            next(e, null);
                        } else {
                            cb();
                        }
                    });
                }
            });
    }, next(null, 'Successfully Added!'));
};

exports.getRecipients = function saveRecipient(next) {

    let sql = `select c.category_name as recipient_list_name, c.date_created, concat(b.first_name,' ',b.last_name) as customer_fullname, b.customer_id, 
    a.date_created as recipient_date_created, a.date_updated as recipient_date_updated FROM recipients a join customers b 
    on a.customer_id=b.customer_id join categories c on a.category_id = c.category_id`
    let params = null;

    db.query(sql, params, function(err, response) {
        if (err) {
            next(err, null);
        } else {
            next(null, response);
        }
    });
};

exports.removeCustomerFromRecipent = function removeCustomerFromRecipent(recipient_id, next) {

    let sql = `DELETE FROM recipients where recipient_id = $1`
    let params = [recipient_id];

    db.query(sql, params, function(err, response) {
        if (err) {
            next(err, null);
        } else {
            next(null, response);
        }
    });
};