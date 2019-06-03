// requires!!!!
const express = require('express')
const app = require()
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const session = require('express-session')

//will need dotenv require and PORT and API_KEY requires

//will need to require database once created

//middleware
app.use(bodyParser.urlencoded({extended:false}))
app.use(methodOverride('_method'))


//require the controllers once made: auth/login controller and user controller (plus others)


//top of app if using ejs; get route for home 

app.get('/', (req,res,next) => {
	res.render('home.ejs')

})

//app listener

app.listen(PORT, () => {
	console.log('app listening on PORT', 3000);
})


