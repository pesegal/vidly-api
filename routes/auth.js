const _ = require('lodash');
const bcrypt = require('bcrypt');
const express = require('express');
const Joi = require('joi');
const routes = express.Router();
const { User } = require('../models/users');

// User Routes
routes.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('Invalid email or password.')

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send('Invalid email or password.');

    res.send(true);
});


function validate(req) {
    const schema = {
        email: Joi.string().email().min(5).max(50).required(),
        password: Joi.string().min(6).max(50).required()
    }
    return Joi.validate(req, schema);
}

module.exports = routes; 