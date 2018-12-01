const express = require('express');
const routes = express.Router();
const mongoose = require('mongoose');
const { User, validate } = require('../models/users');

// User Routes
routes.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const user = new User(req.body);

    try {
        const result = await user.save();
        res.send(result);
    }
    catch (err) {
        res.send(err);
    }
});

module.exports = routes; 