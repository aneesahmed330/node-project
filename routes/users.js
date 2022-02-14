const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const auth = require('../middleware/auth')
const router = express.Router();
const {User, validateUser} = require('../models/User')

router.get('/', async (req, res) => {
    const Users = await User.find()
    res.send(Users).status(200)
})

router.get('/me' , auth ,async (req,res) => {
    console.log("ussser" , req.user)

    let user = await User.findById( req.user.__id).select('-password')
    res.status(200).send(user)
})

router.post('/', async (req, res) => {
    const {error} = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message)

    // check if user already exist or not
    let user = await User.findOne({email: req.body.email});
    console.log(user)
    if (user) return res.status(400).send("User already exists!")
    // hash pass
    const salt = await bcrypt.genSalt(10);
    let pass =  await bcrypt.hash(req.body.password , salt);
    // new user
    user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: pass
    })

    await user.save();
    const token = user.generateAuthToken()
    res.header('x-auth-token' , token).send(user).status(200)
})


module.exports = router;