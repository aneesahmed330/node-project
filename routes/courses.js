const express = require('express')
const Joi = require("joi");
const router = express.Router();
const auth = require('../middleware/auth')
const {Course , validateCourse} = require('../models/Course')
const courseSchema = Joi.object({
    name: Joi.string().min(5).required()
})


const findCourse = (id) => {
    return Courses.find(c => c.id === parseInt(id))
}

const Courses = [
    {
        id: 1,
        name: 'maths'
    },
    {
        id: 2,
        name: 'Chemistry'
    },
    {
        id: 3,
        name: 'Physics'
    }
];

router.get('/', auth ,async (req, res) => {
    let Courses = await Course.find({author : "Mosh" })
        .limit(5)
        .sort({name:'1'})
        .select(['name', 'author'])
    // grab from DB
    res.send(Courses).status(200)
})
router.get('/:id', (req, res) => {

    let course = findCourse(req.params.id)
    if (!course) res.status(404).send('No Course with that id')
    res.status(200).send(course);
})
router.post('/', async (req, res) => {
    //create
    let course = new Course({
        name : req.body.name,
        author: req.body.author,
        tags:req.body.tags,
        isPublished :req.body.isPublished === 'true' ? true : false
    })

    try {
        await course.save();
        res.status(200).send(course)
    }catch (e) {
        console.log(e.message)
    }

    // let results = courseSchema.validate(req.body);
    // if (results.error) return res.status(400).send(results.error.message)
    // Courses.push(course);


})
router.put('/:id', (req, res) => {
    let course = findCourse(req.params.id);
    if (!course) return res.status(400).send('No course with that id')
    //validate
    const results = validateCourse(req.body)
    if (results.error) return res.status(400).send(results.error.message);
    // -
    course.name = req.body.name;
    res.send(course)


})
router.delete('/:id', (req, res) => {
    let course = findCourse(req.params.id);
    if (!course) return res.status(400).send('No course with that id')
    let index = Courses.indexOf(course);
    Courses.splice(index, 1)
    res.send('Course del successfully')

})


module.exports = router