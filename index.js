require('dotenv').config()
const express = require('express')
const app = express();
const config = require('config')
const helmet = require('helmet')
const morgan = require('morgan');
const {connection} =require('./config/database')

// create debugger
const debug = require('debug')('app:debug')
const dbDebug = require('debug')('app:db')

// check if secret key is set or not
if(!(config.get('Private_key'))){
    console.error("FATAL ERROR" , 'JWT KEY IS NOT SET..!')
    process.exit(1)
}

//middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'))
app.use(helmet())
// custom middleware
app.use((req, res, next) => {
    console.log(req.url)
    next()
})

// env
if (app.get('env') === 'development') {
    app.use(morgan('tiny'))
    debug("morgan enabled")
}
console.log("NODE_ENV", process.env.NODE_ENV)

console.log(`app name: ${config.get('name')}`)
console.log("mail server", config.get('dev-mail-server.HOST'))
console.log("mail server", config.get('dev-mail-server.PASS'))



//routes
const courses = require('./routes/courses')
const users = require('./routes/users')
const auth = require('./routes/auth')
const home = require('./routes/routes')
app.use('/api/courses' , courses)
app.use('/api/users' , users)
app.use('/api/auth' , auth)

app.use('/' , home )

// connect to db
connection()


// constants
const PORT = process.env.PORT || 1337;

// helper
app.listen(PORT, () => {
    console.log(`listening on the port ${PORT}`)
})
