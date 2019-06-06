const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Group = require('../models/group');
const Join = require('../models/join');
const session = require('express-session')


//user index all users route 
//Needs to grab all the users with username and basic infor
//needs to display all the users on the google map

router.get('/', async (req,res,next) => {
	console.log(req.body, 'this is the req.body for all users');
	console.log(req.session);
	try {
		const allUsers = await User.find(); //need to change this to specify
		res.json({ 							// by certain search results
			status: 200,
			data: allUsers
		})
	} catch(err) {
		next(err)
	}
}) //end of user index all users route

//user index route to display users that match certain parameters
router.get('/match', async (req,res,next) => {
	console.log(req.session.userDBId, 'here is the req.session.userDBId');
	console.log("^^^^^^^^^^^^^^^^^ req.session.userDBId");
	console.log(req.session, 'here is the req.session');
	// console.log(User, "here is the User");
	try {
		const foundUser = await User.findById(req.session.userDBId) //will need req.session._id
		console.log(foundUser, "foundUser");
		console.log(foundUser, "here is the foundUser");
		console.log(foundUser.gamesystem.dnd5e, "here is the gamesystem");
		// res.json({
		// 	status: 200,
		// 	data: foundUser
		// })

		//<--------------GM/PC LOOKING FOR D&D 5E GROUP---------------->

		//<-----PC looking for GM----->>>>>>
		if(
			(
				foundUser.gamemaster == false && 
				foundUser.gamesystem.dnd5e == true && 
				foundUser.gamestyle.roleplay == true 
			)
			|| 
			(
				foundUser.playerCharacter == true && 
				foundUser.gamesystem.dnd5e == true && 
				foundUser.gamestyle.roleplay == true
			)
		) {

			let foundDungeonMaster = await User.find({
				$and: [
					{
						gamemaster: true
					}, 
			
					{
						"gamesystem.dnd5e" : true

					},

					{
						lookingForGroup: true
					}, 
					
					{
						"gamestyle.roleplay" : true}
				]
			})
			

			// console.log("\n\n\n\n\n here is what the query found")
			// console.log(foundDungeonMaster, "foundDungeonMaster");

			res.json({
				status: 200,
				data: foundDungeonMaster
			})

			console.log("1st if");
		}// if

		else if(
				(
					foundUser.gamemaster == false && 
					foundUser.gamesystem.dnd5e == true && 
					foundUser.gamestyle.combat == true
				) 
				|| 
				(
					foundUser.playerCharacter == true && 
					foundUser.gamesystem.dnd5e == true && 
					foundUser.gamestyle.combat == true
				)
			) {

			let foundDungeonMaster = await User.find({
				$and:[
					{
						gamemaster: true
					},

					{
						"gamesystem.dnd5e": true
					}, 

					{
						lookingForGroup: true
					}, 

					{
						"gamestyle.combat": true
					}
				]
			})

			res.json({
				status: 200,
				data: foundDungeonMaster
			})

			console.log("2nd if");
		}

		else if(
				(
					foundUser.gamemaster == false && 
					foundUser.gamesystem.dnd5e == true && 
					foundUser.gamestyle.dungeonCrawl == true
				) 
				|| 
				(
					foundUser.playerCharacter == true && 
					foundUser.gamesystem.dnd5e == true && 
					foundUser.gamestyle.dungeonCrawl == true
				)

			) {
			let foundDungeonMaster = await User.find(
				{$and:[
					{
						gamemaster: true
					},

					{
						"gamesystem.dnd5e": true
					},

					{
						lookingForGroup: true
					},

					{
						"gamestyle.dungeonCrawl":true
					}
				]
			})
			res.json({
				status: 200,
				data: foundDungeonMaster
			})
			console.log("3rd if");
		}

		else if(
				(
					foundUser.gamemaster == false && 
					foundUser.gamesystem.dnd5e == true
				) 
				|| 
				(
					
					foundUser.playerCharacter == true && 
					foundUser.gamesystem.dnd5e == true
				)
			) {
			let foundDungeonMaster = await User.find(
				{$and:[
					{
						gamemaster: true
					},

					{
					 	"gamesystem.dnd5e": true
					},

					{
						lookingForGroup: true
					}
				]
			})

			res.json({
				status: 200,
				data: foundDungeonMaster
			})
			console.log("4th if");
		}
// <<<<----------GM looking for PC's------->>>>>>>>
		
	} catch(err) {
		next(err)
	}
}) //end of user index route for particular parameters
		


		// // <----looking only for gamemaster---->
		// if(foundUser.gamemaster == false || foundUser.playerCharacter == true) {
		// 	const findGameMaster = await User.find({gamemaster: true})
		// 	// console.log(foundUser, 'here is the foundUser again');
		// 	console.log(findGameMaster, 'here are all the users that match');
		// 	res.json({
		// 		status: 200,
		// 		data: findGameMaster
		// 	})
		// }
		// //<-----looking for group----->
		// const lookingForGroup = await User.find({lookingForGroup: true})

		// // if(foundUser.gamesystem.dnd5e == true) {
		// // }
		// // if foundUser marks true for any gamesystems and found users have any of these game systems marked true
		// if(foundUser.gamesystem.dnd5e == true || foundUser.gamesystem.pathfinder == true || 
		// 	foundUser.gamesystem.starfinder == true || foundUser.gamesystem.dnd3_5 == true || foundUser.gamesystem.callOfCthulu == true) {
		// 	const findGameSystem = await User.find({$or:[{gamesystem: {dnd5e: true}},{gamesystem: {pathfinder: true}},{gamesystem: {starfinder: true}},{gamesystem: {dnd3_5: true}},{gamesystem: {callOfCthulu: true}} ]})
		// 	res.json({
		// 		status: 200,
		// 		data: findGameSystem
		// 	})
		// }

//user create/post route 
//needs to create a User entry based on the 
//req.session logged == true
//req.session username, email, and password
//
router.post('/', async (req,res,next) => {
	console.log(req.body, "this is the session req.body");
	try {
		const createdUser = await User.create(req.body)
		req.session.logged = true;
		req.session.username = req.body.username
		req.session.password = req.body.password
		req.session.email = req.body.email;
		res.json({
			status: 200,
			data: createdUser
		})

	} catch(err) {
		console.log(err);
		next(err)

	}
}) //end of user create route


//user show route
//needs to show all the data in the user
//including the data of un-submitted categories
router.get('/:id', async (req,res,next) => {
	try {
		const foundUser = await User.findById(req.params.id)
		res.json({
			status: 200,
			data: foundUser
		})
	} catch(err){
		console.log(err);
		next(err)
	}
}) //end of user show route

//user delete route
//deletes the user

router.delete('/:id', async (req,res,next) => {
	try {
		const deletedUser = await User.findByIdAndRemove(req.params.id);
		res.json({
			status: 200,
			data: deletedUser,
			message: "You successfully deleted a user!"
		})

	} catch(err) {
		next(err)
	}
}) //end of user delete route

//user update route
//updates the user

router.put('/:id', async (req,res,next) => {
	try {
		const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {new:true})
		res.json({
			status: 200,
			data: updatedUser
		})
	} catch(err) {
		next(err)
	}
}) //end of user update route

module.exports = router;





