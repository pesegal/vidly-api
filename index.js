const express = require('express');
const Joi = require('joi');
const genres = require('./routes/genre');

const app = express();
app.use(express.json());
app.use('/api/genres', genres);

function validateGenre(g) {
    const schema = {
        id: Joi.number(), // Added this so that we can do put without uri params
        name: Joi.string().min(3).required()
    };
    return Joi.validate(g, schema);
}

// This is how you set a port from an environment variable
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})
