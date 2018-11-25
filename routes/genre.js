const express = require('express');
const routes = express.Router();
const Joi = require('joi');

const mongoose = require('mongoose');


const genreSchema = new mongoose.Schema({
    name: { type:String, required: true, minlength: 3 }
});

const Genre = mongoose.model('Genre', genreSchema);

routes.get('/', (req, res) => {
    async function getGenres() {
        const genres = await Genre.find().select({ _id:1, name:1 });
        return res.send(genres);
    }
    getGenres();
});

routes.post('/', (req, res) => {
    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    // Create in database
    async function createGenre(body) {
        const genre = new Genre({
            name: body.name
        });
        try {
            const result = await genre.save();
            res.send(result);
        }
        catch (err) {
            res.send(err);
        }
    }
    createGenre(req.body);
});

routes.put('/:id', (req, res) => {
    async function updateGenre(id, body) {
        // find object
        const genre = await Genre.findById(id);
        if (!genre) return new Error(`No genre with id: ${id} found.`);
        // validate body
        const { error } = validateGenre(body);
        if (error) return res.status(400).send(error);
        // Update item
        genre.set(body);
        try {
            res.send(await genre.save());
        }
        catch(err) {
            res.send(err);
        }        
    }
    updateGenre(req.params.id, req.body);    
});

routes.delete('/:id', (req, res) => {
    async function removeGenre(id) {           
        const result = await Genre.deleteOne({ _id: id });
        if (!result) return res.status(404).send(`No genre with id: ${id} found.`);
        res.send(result);
    }
    removeGenre(req.params.id);
});

function validateGenre(g) {
    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(g, schema);
}

module.exports = routes;