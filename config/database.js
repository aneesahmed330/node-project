const mongoose = require('mongoose')

const connection = () => {
    mongoose.connect('mongodb://localhost/dtx')
        .then(() => {
            console.log("connected to the db")
        }).catch((err) => {
        console.log(err.message)
    })
}
module.exports = {connection}
