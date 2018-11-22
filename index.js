const express = require('express');
const Joi = require('joi');

// Example in memory data structure for simplicity.
let genres = [
    { id: 1, name: 'Classical' },
    { id: 2, name: 'Jazz' },
    { id: 3, name: 'Rock' }
]

const app = express();

function validateGenre(g) {
    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(g, schema);
}

const genre_uri = '/api/genres';
app.get(genre_uri, (req, res) => {
    res.send(genres);
});

app.post(genre_uri, (req, res) => {
    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const genre = {
        id: genres.length + 1,
        name: req.body.name
    };
    genres.push(genre);
    res.send(genre);
});

app.put(genre_uri + '/:id', (req, res) => {
    const genre = genres.find(id => id === parseInt(req.body.id));
    if (!genre) return res.status(404).send(`No genre with id: ${req.body.id} found.`);
    const { error } = validateGenre(req.body);
    if (error) return res.statusCode(400).send(error);
    genre.name = req.body.name;
    res.send(genre);    
});

app.delete(genre_uri + '/:id', (req, res) => {
    // todo validate that the record exists
    // delete the record
})

// This is how you set a port from an environment variable
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})
