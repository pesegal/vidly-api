const express = require('express');
const routes = express.Router();
const mongoose = require('mongoose');
const { Movie, validate } = require('../models/genre');

routes.get('/', async (req, res) => {
    const genres = await Movie.find().select({ _id:1, name:1 });
    return res.send(genres);
});

routes.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    // Create in database
    const genre = new Movie({
        name: req.body.name
    });
    try {
        const result = await genre.save();
        res.send(result);
    }
    catch (err) {
        res.send(err);
    }
});

routes.put('/:id', async (req, res) => {
    // validate body
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error);
    const genre = await Movie.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true });
    if (!genre) return res.status(404).send(Error(`No genre with id: ${req.params.id} found.`));
    res.send(genre);
});

routes.delete('/:id', async (req, res) => {         
    const genre = await Movie.findByIdAndDelete(req.params.id);
    if (!genre) return res.status(404).send(`No genre with id: ${req.params.id} found.`);
    res.send(genre);
});

routes.get('/:id', async (req, res) => {
    const genre = await Movie.findById(req.params.id);
    if (!genre) return res.status(404).send('The genre with the given ID not found');
    res.send(genre);
})

module.exports = routes;