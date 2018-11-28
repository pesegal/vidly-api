const express = require('express');
const routes = express.Router();
const mongoose = require('mongoose');
const { Movie, validate } = require('../models/movies');
const { Genre } = require('../models/genre');

routes.get('/', async (req, res) => {
    const movies = await Movie.find().select({ _id:1, name:1 });
    return res.send(movies);
});

routes.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    // Create in database
    const genre = await Genre.findById(req.body.genreId);
    if (!genre) return res.status(400).send('Invalid genre.');

    const movie = new Movie({
        title: req.body.title,
        genre: {
            _id: genre._id,
            name: genre.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    });
    try {
        const result = await movie.save();
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

    const genre = await Genre.findById(req.body.genreId);
    if (!genre) return res.status(400).send('Invalid genre.');

    const movie = await Movie.findByIdAndUpdate(req.params.id, {
            title: req.body.title,
            genre: {
                _id: genre._id,
                name: genre.name
            },
            numberInStock: req.body.numberInStock,
            dailyRentalRate: req.body.dailyRentalRate
        }, { new: true });
    if (!movie) return res.status(404).send(Error(`No genre with id: ${req.params.id} found.`));
    res.send(movie);
});

routes.delete('/:id', async (req, res) => {         
    const movie = await Movie.findByIdAndDelete(req.params.id);
    if (!movie) return res.status(404).send(`No genre with id: ${req.params.id} found.`);
    res.send(movie);
});

routes.get('/:id', async (req, res) => {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).send('The genre with the given ID not found');
    res.send(movie);
})

module.exports = routes;