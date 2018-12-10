const winston = require('winston');
require('winston-mongodb');
require('express-async-errors') // this keeps us from having to explictly wrap each endpoint in a middleware call.

module.exports = function() {
    // Logic to capture uncaught exceptions 
    process.on('unhandledRejection', (ex) => {
        throw ex;
    });

    winston.handleExceptions(new winston.transports.File({ filename: 'uncaughtExceptions.log' }));
    winston.add(winston.transports.File, { filename: 'logfile.log' });
    winston.add(winston.transports.MongoDB, { db: 'mongodb://localhost/vidly', level: 'info' });
}

