'use strict';

const customerDao = require('../daos/customerDao');
const recipientDao = require('../daos/recipientDao');
const cb = require('../utils/callback');

module.exports = function(app, passport, isLoggedIn, isAdmin) {      

    app.route('/').get(function(req, res) {
        res.render('index');
    });

    app.route('/categories')
        .get(function(req, res) {
            customerDao.getCategories(cb.setupResponseCallback(res));
        })
        .post(function(req, res) {
            customerDao.saveCategory(req.body, cb.setupResponseCallback(res));
        });

    app.route('/categories/:category_id')
        .get(function(req, res) {
            customerDao.getCategoryByID(req.params.category_id, cb.setupResponseCallback(res));
        })
        .put(function(req, res) {
            customerDao.updateCategories(req.params.category_id, req.body, cb.setupResponseCallback(res));
        })
        .delete(function(req, res) {
            customerDao.removeCategories(req.params.category_id, cb.setupResponseCallback(res));
        });

    app.route('/customer')
        .get(function(req, res) {
            customerDao.getCustomers(cb.setupResponseCallback(res));
        })
        .post(function(req, res) {
            customerDao.saveCustomer(req.body, cb.setupResponseCallback(res));
        });
    
    app.route('/customer/:id')
        .get(function(req, res) {
            customerDao.getCustomersByID(req.params.id, cb.setupResponseCallback(res));
        })
        .put(function(req, res) {
            customerDao.updateCustomer(req.params.id, req.body, cb.setupResponseCallback(res));
        })
        .delete(function(req, res) {
            customerDao.removeCustomer(req.params.id, cb.setupResponseCallback(res));
        });

    app.route('/recipient')
        .get(function(req, res) {
            recipientDao.getRecipients(cb.setupResponseCallback(res));
        })
        .post(function(req, res) {
            recipientDao.saveRecipient(req.body, cb.setupResponseCallback(res));
        });

    app.route('/recipient/:id')
        .delete(function(req, res) {
            recipientDao.removeCustomerFromRecipent(req.params.id, cb.setupResponseCallback(res));
        });
};