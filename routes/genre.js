const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const express = require('express');
const routes = express.Router();
const mongoose = require('mongoose');
const { Genre, validate } = require('../models/genre');

routes.get('/', async (req, res) => {
    throw new Error('Could not get the genres.');
    const genres = await Genre.find().select({ _id:1, name:1 });
    res.send(genres);
});

routes.post('/', auth, async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    // Create in database
    const genre = new Genre({
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

routes.put('/:id', auth, async (req, res) => {
    // validate body
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error);
    const genre = await Genre.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true });
    if (!genre) return res.status(404).send(Error(`No genre with id: ${req.params.id} found.`));
    res.send(genre);
});

routes.delete('/:id', [auth, admin], async (req, res) => {         
    const genre = await Genre.findByIdAndDelete(req.params.id);
    if (!genre) return res.status(404).send(`No genre with id: ${req.params.id} found.`);
    res.send(genre);
});

routes.get('/:id', async (req, res) => {
    const genre = await Genre.findById(req.params.id);
    if (!genre) return res.status(404).send('The genre with the given ID not found');
    res.send(genre);
})

module.exports = routes;