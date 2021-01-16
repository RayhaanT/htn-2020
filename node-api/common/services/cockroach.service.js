var async = require('async');
var fs = require('fs');
var pg = require('pg');
const config = require('../config/env.config');
let count = 0;

// Connect to the "bank" database.
var cockroachConfig = {
    user: 'admin',
    host: 'localhost',
    database: 'htn',
    port: 26257
};

// Create a pool.
var pool = new pg.Pool(cockroachConfig);

pool.query(
    "CREATE TABLE IF NOT EXISTS users \
        (id SERIAL PRIMARY KEY, \
         age INT, \
         occupation STRING, \
         longitude DOUBLE PRECISION, \
         latitude DOUBLE PRECISION, \
         name STRING, \
         hash STRING, \
         salt STRING, \
         email STRING UNIQUE, \
         permission INT, \
         priority FLOAT, \
         vaccinated BOOL);"
);

// pool.connect(function (err, client, done) {

//     // Close communication with the database and exit.
//     var finish = function () {
//         done();
//         process.exit();
//     };

//     if (err) {
//         console.error('could not connect to cockroachdb', err);
//         finish();
//     }

//     // Set up users table
//     client.query(
//         );
    
//     // finish();
// });

exports.pool = pool;