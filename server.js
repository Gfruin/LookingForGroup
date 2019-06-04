// requires!!!!
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const session = require('express-session')

//will need dotenv require and PORT and API_KEY requires
require('dotenv').config()
const PORT = process.env.PORT
//will need to require database once created
require('./db/db');

//middleware
app.use(session({
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUninitialized: false
}))
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(methodOverride('_method'))


//require the controllers once made: auth/login controller and user controller (plus others)
const authController = require('./controllers/authController');


app.use('/api/v1/auth', authController)
// app.get('/', (req,res,next) => {
// 	res.render('home.ejs')

// })

//app listener

app.listen(process.env.PORT, () => {
	console.log('app listening on PORT', process.env.PORT);
})


