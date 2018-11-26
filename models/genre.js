const Joi = require('joi');
const mongoose = require('mongoose');

function validateGenre(g) {
    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(g, schema);
}

const genreSchema = new mongoose.Schema({
    name: { type:String, required: true, minlength: 3 }
});

const Genre = mongoose.model('Genre', genreSchema);

exports.Genre = Genre;
exports.validate = validateGenre;