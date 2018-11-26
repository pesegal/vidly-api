const mongoose = require('mongoose');
const Joi = require('joi');

// Define customer Joi Validation Schema
function validateCustomer(customer) {
    const schema = {
        isGold: Joi.boolean().default(false),
        name: Joi.string().required(),
        phone: Joi.string().allow('')
    }
    return Joi.validate(customer, schema);
}

const customerSchema = mongoose.Schema({
    isGold: Boolean,
    name: { type: String, required: true },
    phone: String
});

const Customer = mongoose.model('Customer', customerSchema);

exports.Customer = Customer;
exports.validate = validateCustomer;