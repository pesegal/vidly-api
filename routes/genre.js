const express = require('express');
const routes = express.Router();
const Joi = require('joi');

// Example in memory data structure for simplicity.
let genres = [
    { id: 1, name: 'Classical' },
    { id: 2, name: 'Jazz' },
    { id: 3, name: 'Rock' }
]

routes.get('/', (req, res) => {
    res.send(genres);
});

routes.post('/', (req, res) => {
    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const genre = {
        id: genres.length + 1,
        name: req.body.name
    };
    genres.push(genre);
    res.send(genre);
});

routes.put('/', (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.body.id));
    if (!genre) return res.status(404).send(`No genre with id: ${req.body.id} found.`);
    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(error);
    genre.name = req.body.name;
    res.send(genre);    
});

routes.delete('/:id', (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send(`No genre with id: ${req.params.id} found.`);
    genres.splice(genres.indexOf(genre), 1); // note: splice, not slice
    res.send(genre);
});

function validateGenre(g) {
    const schema = {
        id: Joi.number(), // Added this so that we can do put without uri params
        name: Joi.string().min(3).required()
    };
    return Joi.validate(g, schema);
}

module.exports = routes;