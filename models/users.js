const mongoose = require('mongoose');
const Joi      = require('joi');

function validateUser(user) {
    const schema = {
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).max(50).required()
    }
    
    return Joi.validate(user, schema);
}

const userSchema = mongoose.Schema({
    name: String,
    email: {
        type: String,
        unique: true,
        require: true
    },
    password: { 
        type: String,
        min: 6,
        max: 50, 
        require: true 
    }
});

const User = mongoose.model('User', userSchema);

exports.validate = validateUser;
exports.User     = User;