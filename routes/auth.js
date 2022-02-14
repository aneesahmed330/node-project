const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const router = express.Router();
const {User} = require('../models/User')
const Joi = require("joi");

const validateUser = (req) => {
    const schema = Joi.object({
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(8).max(1024).required()
    })

    return schema.validate(req);
}

router.post('/', async (req, res) => {
    const {error} = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message)

    // check if user already exist or not
    let user = await User.findOne({email: req.body.email});
    if (!user) return res.status(400).send("email or password is incorrect!")

    // hash pass
    const validPass = await bcrypt.compare(req.body.password, user.password)
    if (!validPass) return res.status(400).send("email or password is incorrect!")

    // create token
    const token = user.generateAuthToken()
    res.header('x-auth-token' , token).send(token).status(200)
})


module.exports = router;