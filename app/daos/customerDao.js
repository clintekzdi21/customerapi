const moment = require('moment');
const Database = require('../../app/utils/database').Database;
const db = new Database();

exports.getCustomers = function getCustomers(next) {
   
    let sql = 'SELECT * FROM customers';
    let params = null;
    db.query(sql, params, function(err, response) {
        if (err) {
            next(err, null);
        } else {
            next(null, response);
        }
    });
};

exports.getCustomersByID = function getCustomersByID(customer_id, next) {
   
    let sql = 'SELECT * FROM customers where customer_id = $1';
    let params = [customer_id];
    db.query(sql, params, function(err, response) {
        if (err) {
            next(err, null);
        } else {
            next(null, response);
        }
    });
};

exports.saveCustomer = function saveCustomer(data, next) {
    let sql = 'INSERT INTO customers (first_name, last_name, birth_date, gender, created_by) VALUES ($1, $2, $3, $4, $5) RETURNING customer_id';
    let params = [data.first_name, data.last_name, data.birth_date, data.gender, data.created_by];

    db.query(sql, params, function(err, response) {
        if (err) {
            next(err, null);
        } else {
            next(null, response);
        }
    });
};

exports.updateCustomer = function updateCustomer(customer_id, data, next) {
    let updateAt = moment().format('YYYY-MM-DD HH:mm:ss');
    let sql = 'UPDATE customers set first_name=$1, last_name=$2, birth_date=$3, gender=$4, created_by=$5, last_updated=$6 WHERE customer_id = $7';
    let params = [data.first_name, data.last_name, data.birth_date, data.gender, data.created_by, updateAt, customer_id];

    db.query(sql, params, function(err, response) {
        if (err) {
            next(err, null);
        } else {
            next(null, 'Updated Successfully');
        }
    });

};

exports.removeCustomer = function removeCustomer(customer_id, next) {
    let sql = 'DELETE FROM customers WHERE customer_id = $1';
    let params = [customer_id];

    db.query(sql, params, function(err, response) {
        if (err) {
            next(err, null);
        } else {
            next(null, 'Removed Successfully');
        }
    });

};

exports.saveCategory = function saveCategory(data, next) {
    let sql = 'INSERT INTO categories (category_name, created_by) VALUES ($1, $2)';
    let params = [data.category_name, data.created_by];

    db.query(sql, params, function(err, response) {
        if (err) {
            next(err, null);
        } else {
            next(null, response);
        }
    });
};

exports.getCategories = function getCategories(next) {
    let sql = 'SELECT * FROM categories';
    let params = null;

    db.query(sql, params, function(err, response) {
        if (err) {
            next(err, null);
        } else {
            next(null, response);
        }
    });
};

exports.getCategoryByID = function getCategoryByID(category_id, next) {
    let sql = 'SELECT * FROM categories where category_id = $1';
    let params = [category_id];

    db.query(sql, params, function(err, response) {
        if (err) {
            next(err, null);
        } else {
            next(null, response);
        }
    });
};


exports.updateCategories = function updateCategories(category_id, data, next) {

    let updateAt = moment().format('YYYY-MM-DD HH:mm:ss');
    let sql = 'UPDATE categories set category_name=$1, date_updated=$2 where category_id=$3';
    let params = [data.category_name, updateAt, category_id];
    console.log('sql', sql);
    db.query(sql, params, function(err, response) {
        if (err) {
            next(err, null);
        } else {
            next(null, response);
        }
    });
};

exports.removeCategories = function removeCategories(category_id, next) {

    let sql = 'DELETE FROM categories WHERE category_id = $1';
    let params = [category_id];

    db.query(sql, params, function(err, response) {
        if (err) {
            next(err, null);
        } else {
            next(null, response);
        }
    });
};