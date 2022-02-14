const mongoose = require('mongoose')
const Joi = require('joi')
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        min: 5,
        max: 30,
        required: true,
    },
    lastName: {
        type: String,
        min: 5,
        max: 30,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        min: 5,
        max: 255,
        required: true,
    },
    password: {
        type: String,
        required: true,
        min: 8,
        max: 1024
    }
})

userSchema.methods.generateAuthToken = function () {
    return jwt.sign({__id : this._id} , process.env.PRIVATE_KEY)
}
const validateUser = (User) => {
    const schema = Joi.object({
        firstName: Joi.string().min(5).max(30).required(),
        lastName: Joi.string().min(5).max(30).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(8).max(1024).required()
    })

    return schema.validate(User);
}

const User = mongoose.model('User', userSchema);

module.exports = {User , validateUser}