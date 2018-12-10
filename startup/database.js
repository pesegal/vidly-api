const mongoose = require('mongoose');
const winston = require('winston');

// Connect to MongoDB
module.exports = function() {
    mongoose.connect('mongodb://localhost/vidly', { useNewUrlParser: true })
        .then(() => winston.info('Connected to MongoDB'));
}
