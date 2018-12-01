const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi); // Note this object needs to be above the route loading.
const express = require('express');
const genres = require('./routes/genre');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rental');
const users = require('./routes/users');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
app.use('/api/users', users);

// Connect to MongoDB
mongoose.connect('mongodb://localhost/vidly', { useNewUrlParser: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error("Could not connect to mongoDB."));


// This is how you set a port from an environment variable
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})
