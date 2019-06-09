//require 
const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');

//GET route

// router.get('/login', async (req,res,next) => {
// 	try {
// 		res.json({
// 			status: 500, //is this correct?
// 			data: 'you are not logged in'
// 		})
// 	} catch(err) {
// 		next(err)
// 	}
// }); //end of GET route


// create registration with bcrypt 

router.post('/register', async (req,res,next) => {
	console.log('you hit the register route');

	try {
		const password = req.body.password;
		console.log(password, 'here is the password');
		const passwordHash = await bcrypt.hashSync(password, bcrypt.genSaltSync(10));
		console.log(passwordHash, 'here is the passwordHash');
		const userDBEntry = {};
		userDBEntry.username = req.body.username;
		userDBEntry.email = req.body.email;
		userDBEntry.password = passwordHash;
		console.log(userDBEntry, 'here is the userDBEntry object');
		const createdUser = await User.create(userDBEntry);
		console.log(createdUser, 'here is the createdUser');
		req.session.logged = true;
		req.session.userDBId = createdUser._id;
		req.session.username = createdUser.username

		console.log('you have successfully logged in')
		console.log('here is the session:')
		console.log(req.session)

		res.json({
			status: 200,
			data: createdUser
		})
	} catch(err){
		next(err)
	}
}) //end of the registration route


//login route

router.post('/login', async (req,res,next) => {
	try {
		const foundUser = await User.findOne({'email': req.body.email})
		console.log(foundUser, 'here is the foundUser');
		console.log(foundUser.email, "here is the foundUser.email");
		console.log(foundUser.password, "here is the foundUser.email");

		if(foundUser) {
			if(bcrypt.compareSync(req.body.password, foundUser.password) === true) {
				req.session.message = '';
				req.session.logged = true;
				req.session.userDBId = foundUser._id;
				console.log(req.session.userDBId, 'here is the req.session.userDBId');
				req.session.username = foundUser.username;
				req.session.email = foundUser.email;
				req.session.password = foundUser.password

				console.log('you have successfully logged in')
				console.log('here is the session:')
				console.log(req.session)

				res.json({
					status: 200,
					data: foundUser
				})


			} else {
				console.log('the email address was not found');
				req.session.message = 'Email or Password is incorrect'
				res.json({
					status: 500, //is this correct?
					data: req.session.message
				})
			}
		}
	} catch(err) {
		next(err)
	}
}) //end of login route

router.get('/logout', async (req,res,next) => {
	req.session.destroy((err) => {
		if(err){
			next(err)
		} else {
			res.json({
				status: 200,
				data: 'you are logged out!'
			})
		}
	})
})


module.exports = router;








