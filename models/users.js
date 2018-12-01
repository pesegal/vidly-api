const mongoose = require('mongoose');
const Joi      = require('joi');

function validateUser(user) {
    const schema = {
        name: Joi.string().min(3).max(50).required(),
        email: Joi.string().email().min(5).max(50).required(),
        password: Joi.string().min(6).max(50).required()
    }
    return Joi.validate(user, schema);
}

const userSchema = mongoose.Schema({
    name: {
        type:String,
        require: true,
        minlength: 3,
        maxlength: 50
    },
    email: {
        type: String,
        unique: true,
        require: true,
        minlength: 5,
        maxlength: 50
    },
    password: { 
        type: String,
        minlength: 6,
        maxlength: 1024, 
        require: true 
    }
});

const User = mongoose.model('User', userSchema);

exports.validate = validateUser;
exports.User     = User;