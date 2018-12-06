const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi); // Note this object needs to be above the route loading.
const express = require('express');
const genres = require('./routes/genre');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rental');
const users = require('./routes/users');
const auth = require('./routes/auth');
const mongoose = require('mongoose');
const config = require('config');

const app = express();
app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
app.use('/api/users', users);
app.use('/api/auth', auth);

// Middleware function for handling errors. Orchestration
app.use(function(err, req, res, next) {
    // log the exception
    res.status(500).send('Something failed.');
});

// Kill the app in case the environment variable is not set.
if (!config.get('jwtPrivateKey')) {
    console.log('FATAL ERROR: jwtPrivateKey is not defined.');
    process.exit(1);
}

// Connect to MongoDB
mongoose.connect('mongodb://localhost/vidly', { useNewUrlParser: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error("Could not connect to mongoDB."));


// This is how you set a port from an environment variable
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})
