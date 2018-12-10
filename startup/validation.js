const Joi = require('joi');

module.exports = function() {
    Joi.objectId = require('joi-objectid')(Joi); // Note this object needs to be above the route loading.
}