const mongoose =require('mongoose')
const Joi = require("joi");

//COURSE SCHEMA
const courseSchema = new mongoose.Schema({
    name : String,
    author : String,
    tags : [String],
    date : { type: Date , default : Date.now },
    isPublished :Boolean
})
// MODEL
const Course = mongoose.model('Course' , courseSchema)
// JOI validation
const validateCourse = (Course) => {
    let schema = Joi.object({
        name: Joi.string().min(5).required()
    })
    return schema.validate(Course)
}

module.exports = {Course , validateCourse}