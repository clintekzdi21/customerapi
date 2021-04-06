'use strict';

module.exports = {
    env: 'development',
    db_host: process.env.DB_HOST || 'localhost',
    db_user: process.env.DB_USER || 'postgres',
    db_password: process.env.DB_PASsSWORD || '******',
    db_name: 'postgres',
    db_port: 5432,
    port: 3000
};