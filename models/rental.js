const Joi = require('joi');
const mongoose = require('mongoose');
const { customerSchema } = require('./customers');
const { movieSchema } = require('./movies')

const joiRentalSchema = {
    customerId: Joi.objectId().required(),
    movieIds: Joi.array().items(Joi.objectId().required())
};

function validateRental(rental) {
    return Joi.validate(rental, joiRentalSchema);
}

const Rental = mongoose.model('Rental', new mongoose.Schema({
    customer: { type: customerSchema, required: true },
    movies: [{ type: movieSchema, required: true}]
}));

exports.Rental = Rental;
exports.validate = validateRental;