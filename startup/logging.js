const winston = require('winston');
// require('winston-mongodb'); Commented out due to bug in presenters project.
require('express-async-errors') // this keeps us from having to explictly wrap each endpoint in a middleware call.

module.exports = function() {
    // Logic to capture uncaught exceptions 

    winston.handleExceptions(
        new winston.transports.Console({ colorize: true, prettyPrint: true }),
        new winston.transports.File({ filename: 'uncaughtExceptions.log' })        
    );

    process.on('unhandledRejection', (ex) => {
        console.log(ex);
        throw ex;
    });
    winston.add(winston.transports.File, { filename: 'logfile.log' });
    // winston.add(winston.transports.MongoDB, { db: 'mongodb://localhost/vidly', level: 'info' });
}

