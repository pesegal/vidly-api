const express = require('express');
const routes = express.Router();
const mongoose = require('mongoose');
const { Customer, validate } = require('../models/customers');


// Customer Routes
routes.get('/', async (req, res) => {
    const customers = await Customer.find();
    return res.send(customers);
})

routes.post('/', async (req, res) => {
    const { error } = validate(req.body);
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
    const { error } = validate(req.body);
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