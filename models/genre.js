const Joi = require('joi');
const mongoose = require('mongoose');

const joiGenreSchema = {
    name: Joi.string().min(3).required()
};
function validateGenre(g) {
    return Joi.validate(g, joiGenreSchema);
}

const genreSchema = new mongoose.Schema({
    name: { type:String, required: true, minlength: 3 }
});

const Genre = mongoose.model('Genre', genreSchema);

exports.Genre = Genre;
exports.validate = validateGenre;
exports.joiGenreSchema = joiGenreSchema;
exports.genreSchema = genreSchema;