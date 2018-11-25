const express = require('express');
const routes = express.Router();
const Joi = require('joi');

const mongoose = require('mongoose');


const genreSchema = new mongoose.Schema({
    name: { type:String, required: true, minlength: 3 }
});

const Genre = mongoose.model('Genre', genreSchema);

routes.get('/', async (req, res) => {
    const genres = await Genre.find().select({ _id:1, name:1 });
    return res.send(genres);
});

routes.post('/', async (req, res) => {
    const { error } = validateGenre(req.body);
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

routes.put('/:id', async (req, res) => {
    // find object
    const genre = await Genre.findById(req.params.id);
    if (!genre) return new Error(`No genre with id: ${req.params.id} found.`);
    // validate body
    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(error);
    // Update item
    genre.set(req.body);
    try {
        res.send(await genre.save());
    }
    catch(err) {
        res.send(err);
    }          
});

routes.delete('/:id', async (req, res) => {         
    const result = await Genre.deleteOne({ _id: req.params.id });
    if (!result) return res.status(404).send(`No genre with id: ${req.params.id} found.`);
    res.send(result);
});

function validateGenre(g) {
    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(g, schema);
}

module.exports = routes;