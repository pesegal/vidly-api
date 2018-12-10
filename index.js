const winston = require('winston');
const express = require('express');
const app = express();

// Load Startup Functionality
require('./startup/logging')(); // start this first to make sure to log startup errors.
require('./startup/validation')(); // object id method need to be added to Joi object before routes are loaded. 
require('./startup/routes')(app);
require('./startup/database')();
require('./startup/config')();

// This is how you set a port from an environment variable
const port = process.env.PORT || 3000;
app.listen(port, () => {
    winston.info(`Listening on port ${port}`);
})
