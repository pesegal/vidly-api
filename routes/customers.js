const express = require('express');
const routes = express.Router();

const mongoose = require('mongoose');
const Joi = require('joi');

// Define the customer Schema
const customerSchema = mongoose.Schema({
    isGold: Boolean,
    name: { type: String, required: true },
    phone: String
});

// Define customer Joi Validation Schema
function validateCustomer(customer) {
    const schema = {
        isGold: Joi.boolean().default(false),
        name: Joi.string().required(),
        phone: Joi.string().allow('')
    }
    return Joi.validate(customer, schema);
}

const Customer = mongoose.model('Customer', customerSchema);

// Customer Routes
routes.get('/', async (req, res) => {
    const customers = await Customer.find();
    return res.send(customers);
})

routes.post('/', async (req, res) => {
    const { error } = validateCustomer(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const customer = new Customer({
        isGold: req.body.isGold,
        name: req.body.name,
        phone: req.body.phone
    });

    try {
        const result = await customer.save();
        res.send(result);
    }
    catch (err) {
        res.send(err);
    }
});

routes.put('/:id', async (req, res) => {
    const { error } = validateCustomer(req.body);
    if (error) return res.status(400).send(error);
    const customer = await Customer.findByIdAndUpdate(req.params.id, {
        isGold: req.body.isGold,
        name: req.body.name,
        phone: req.body.phone
    }, { new: true });
    if (!customer) return res.status(404).send(`Customer with id: ${req.params.id} not found.`);
    res.send(customer);
});

routes.delete('/:id', async (req, res) => {
    const result = await Customer.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).send(`Customer with id: ${req.params.id} not found.`);
    res.send(result);
});

routes.get('/:id', async (req, res) => {
    const customer = await Customer.findById(req.params.id);
    if (!customer) return res.status(404).send(`Customer with id: ${req.params.id} not found.`);
    res.send(customer); 
})

module.exports = routes;