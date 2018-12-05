const express = require('express');
const routes = express.Router();
const mongoose = require('mongoose');
const { Rental, validate } = require('../models/rental');
const { Customer } = require('../models/customers');
const { Movie } = require('../models/movies');
const auth = require('../middleware/auth');


routes.get('/', async (req, res) => {
    const rental = await Rental.find();
    return res.send(rental);
});

routes.post('/', auth, async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    // Create in database

    const customer = await Customer.findById(req.body.customerId).select('-__v');
    if (!customer) return res.status(400).send('Invalid Customer');

    const movies = await Movie.find({ '_id': { $in: req.body.movieIds }}).select('-__v');
    console.log(movies)
    if (movies.length === 0) return res.send(400).send('Invalid Movie(s)');

    const rental = new Rental({
        customer: customer,
        movies: movies
    });
    try {
        const result = await rental.save();
        res.send(result);
    }
    catch (err) {
        res.send(err);
    }
});

module.exports = routes;