const Joi = require('joi');
const mongoose = require('mongoose');
const { genreSchema } = require('./genre');

const joiMovieSchema = {
    title: Joi.string().min(3).max(50).required(),
    genreId: Joi.string().required(),
    numberInStock: Joi.number().min(0).required(),
    dailyRentalRate: Joi.number().min(0).required()
};

function validateMovie(movie) {
    return Joi.validate(movie, joiMovieSchema);
}

const movieSchema = new mongoose.Schema({
    title: { type:String, required: true, minlength: 3 },
    genre: { type:genreSchema, required: true },
    numberInStock: { 
        type:Number, 
        required: true,
        min: 0,
        max: 255 //Setting max keeps malitious large data being inserted.
    },
    dailyRentalRate: {
         type:Number, 
         required: true,
         min: 0,
         max: 255 
        
    }
});

const Movie = mongoose.model('Movie', movieSchema);

exports.Movie = Movie;
exports.validate = validateMovie;
exports.movieSchema = movieSchema;