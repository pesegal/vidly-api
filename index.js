require('express-async-errors') // this keeps us from having to explictly wrap each endpoint in a middleware call.
const winston = require('winston');
require('winston-mongodb');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi); // Note this object needs to be above the route loading.
const express = require('express');
const config = require('config');
const app = express();
require('./startup/routes')(app);
require('./startup/database')();

// Logic to capture uncaught exceptions 
process.on('unhandledRejection', (ex) => {
    throw ex;
});

winston.handleExceptions(new winston.transports.File({ filename: 'uncaughtExceptions.log' }));

winston.add(winston.transports.File, { filename: 'logfile.log' });
winston.add(winston.transports.MongoDB, { db: 'mongodb://localhost/vidly', level: 'info' });

// Kill the app in case the environment variable is not set.
if (!config.get('jwtPrivateKey')) {
    console.log('FATAL ERROR: jwtPrivateKey is not defined.');
    process.exit(1);
}


// This is how you set a port from an environment variable
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})
