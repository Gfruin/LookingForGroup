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
		if(
			(
				foundUser.gamemaster == true && 
				foundUser.gamesystem.dnd5e == true && 
				foundUser.gamestyle.roleplay == true 
			)
			|| 
			(
				foundUser.playerCharacter == false && 
				foundUser.gamesystem.dnd5e == true && 
				foundUser.gamestyle.roleplay == true
			)
		) {

			let foundPC = await User.find({
				$and: [
					{
						playerCharacter: true 
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
				data: foundPC
			})
			
			console.log("1st if, foundPC");
		}// if

		else if(
				(
					foundUser.gamemaster == true && 
					foundUser.gamesystem.dnd5e == true && 
					foundUser.gamestyle.combat == true
				) 
				|| 
				(
					foundUser.playerCharacter == false && 
					foundUser.gamesystem.dnd5e == true && 
					foundUser.gamestyle.combat == true
				)
			) {

			let foundPC = await User.find({
				$and:[
					{
						playerCharacter: true
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
				data: foundPC
			})

			console.log("2nd if, foundPC");
		}

		else if(
				(
					foundUser.gamemaster == true && 
					foundUser.gamesystem.dnd5e == true && 
					foundUser.gamestyle.dungeonCrawl == true
				) 
				|| 
				(
					foundUser.playerCharacter == false && 
					foundUser.gamesystem.dnd5e == true && 
					foundUser.gamestyle.dungeonCrawl == true
				)

			) {
			let foundPC = await User.find(
				{$and:[
					{
						playerCharacter: true
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
				data: foundPC
			})
			console.log("3rd if, foundPC");
		}

		else if(
				(
					foundUser.gamemaster == true && 
					foundUser.gamesystem.dnd5e == true
				) 
				|| 
				(
					
					foundUser.playerCharacter == false && 
					foundUser.gamesystem.dnd5e == true
				)
			) {
			let foundPC = await User.find(
				{$and:[
					{
						playerCharacter: true
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
				data: foundPC
			})
			console.log("4th if, foundPC");
		}

/// <<<<<<------Pathfinder ifs----->>>>>>>>>??????

		if(
			(
				foundUser.gamemaster == false && 
				foundUser.gamesystem.pathfinder == true && 
				foundUser.gamestyle.roleplay == true 
			)
			|| 
			(
				foundUser.playerCharacter == true && 
				foundUser.gamesystem.pathfinder == true && 
				foundUser.gamestyle.roleplay == true
			)
		) {

			let foundGameMaster = await User.find({
				$and: [
					{
						gamemaster: true
					}, 
			
					{
						"gamesystem.pathfinder" : true

					},

					{
						lookingForGroup: true
					}, 
					
					{
						"gamestyle.roleplay" : true}
				]
			})
			

			// console.log("\n\n\n\n\n here is what the query found")
			// console.log(foundGameMaster, "foundGameMaster");

			res.json({
				status: 200,
				data: foundGameMaster
			})

			console.log("1st if, foundGameMaster for pathfinder");
		}// if

		else if(
				(
					foundUser.gamemaster == false && 
					foundUser.gamesystem.pathfinder == true && 
					foundUser.gamestyle.combat == true
				) 
				|| 
				(
					foundUser.playerCharacter == true && 
					foundUser.gamesystem.pathfinder == true && 
					foundUser.gamestyle.combat == true
				)
			) {

			let foundGameMaster = await User.find({
				$and:[
					{
						gamemaster: true
					},

					{
						"gamesystem.pathfinder": true
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
				data: foundGameMaster
			})

			console.log("2nd if, foundGameMaster for pathfinder");
		}

		else if(
				(
					foundUser.gamemaster == false && 
					foundUser.gamesystem.pathfinder == true && 
					foundUser.gamestyle.dungeonCrawl == true
				) 
				|| 
				(
					foundUser.playerCharacter == true && 
					foundUser.gamesystem.pathfinder == true && 
					foundUser.gamestyle.dungeonCrawl == true
				)

			) {
			let foundGameMaster = await User.find(
				{$and:[
					{
						gamemaster: true
					},

					{
						"gamesystem.pathfinder": true
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
				data: foundGameMaster
			})
			console.log("3rd if, foundGameMaster for pathfinder");
		}

		else if(
				(
					foundUser.gamemaster == false && 
					foundUser.gamesystem.pathfinder == true
				) 
				|| 
				(
					
					foundUser.playerCharacter == true && 
					foundUser.gamesystem.pathfinder == true
				)
			) {
			let foundGameMaster = await User.find(
				{$and:[
					{
						gamemaster: true
					},

					{
					 	"gamesystem.pathfinder": true
					},

					{
						lookingForGroup: true
					}
				]
			})

			res.json({
				status: 200,
				data: foundGameMaster
			})
			console.log("4th if, foundGameMaster for pathfinder");
		}
// <<<<----------GM looking for PC's------->>>>>>>>
		if(
			(
				foundUser.gamemaster == true && 
				foundUser.gamesystem.pathfinder == true && 
				foundUser.gamestyle.roleplay == true 
			)
			|| 
			(
				foundUser.playerCharacter == false && 
				foundUser.gamesystem.pathfinder == true && 
				foundUser.gamestyle.roleplay == true
			)
		) {

			let foundPC = await User.find({
				$and: [
					{
						playerCharacter: true 
					}, 
			
					{
						"gamesystem.pathfinder" : true

					},

					{
						lookingForGroup: true
					}, 
					
					{
						"gamestyle.roleplay" : true}
				]

			})
			

			// console.log("\n\n\n\n\n here is what the query found")
			// console.log(foundGameMaster, "foundGameMaster");

			res.json({
				status: 200,
				data: foundPC
			})
			
			console.log("1st if, foundPC for pathfinder");
		}// if

		else if(
				(
					foundUser.gamemaster == true && 
					foundUser.gamesystem.pathfinder == true && 
					foundUser.gamestyle.combat == true
				) 
				|| 
				(
					foundUser.playerCharacter == false && 
					foundUser.gamesystem.pathfinder == true && 
					foundUser.gamestyle.combat == true
				)
			) {

			let foundPC = await User.find({
				$and:[
					{
						playerCharacter: true
					},

					{
						"gamesystem.pathfinder": true
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
				data: foundPC
			})

			console.log("2nd if, foundPC for pathfinder");
		}

		else if(
				(
					foundUser.gamemaster == true && 
					foundUser.gamesystem.pathfinder == true && 
					foundUser.gamestyle.dungeonCrawl == true
				) 
				|| 
				(
					foundUser.playerCharacter == false && 
					foundUser.gamesystem.pathfinder == true && 
					foundUser.gamestyle.dungeonCrawl == true
				)

			) {
			let foundPC = await User.find(
				{$and:[
					{
						playerCharacter: true
					},

					{
						"gamesystem.pathfinder": true
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
				data: foundPC
			})
			console.log("3rd if, foundPC, for pathfinder");
		}

		else if(
				(
					foundUser.gamemaster == true && 
					foundUser.gamesystem.pathfinder == true
				) 
				|| 
				(
					
					foundUser.playerCharacter == false && 
					foundUser.gamesystem.pathfinder == true
				)
			) {
			let foundPC = await User.find(
				{$and:[
					{
						playerCharacter: true
					},

					{
					 	"gamesystem.pathfinder": true
					},

					{
						lookingForGroup: true
					}
				]
			})

			res.json({
				status: 200,
				data: foundPC
			})
			console.log("4th if, foundPC for pathfinder");
		}

//<<<<<<<<<------------user starfinder logic
		if(
			(
				foundUser.gamemaster == false && 
				foundUser.gamesystem.starfinder == true && 
				foundUser.gamestyle.roleplay == true 
			)
			|| 
			(
				foundUser.playerCharacter == true && 
				foundUser.gamesystem.starfinder == true && 
				foundUser.gamestyle.roleplay == true
			)
		) {

			let foundGameMaster = await User.find({
				$and: [
					{
						gamemaster: true
					}, 
			
					{
						"gamesystem.starfinder" : true

					},

					{
						lookingForGroup: true
					}, 
					
					{
						"gamestyle.roleplay" : true}
				]
			})
			

			// console.log("\n\n\n\n\n here is what the query found")
			// console.log(foundGameMaster, "foundGameMaster");

			res.json({
				status: 200,
				data: foundGameMaster
			})

			console.log("1st if, foundGameMaster for starfinder");
		}// if

		else if(
				(
					foundUser.gamemaster == false && 
					foundUser.gamesystem.starfinder == true && 
					foundUser.gamestyle.combat == true
				) 
				|| 
				(
					foundUser.playerCharacter == true && 
					foundUser.gamesystem.starfinder == true && 
					foundUser.gamestyle.combat == true
				)
			) {

			let foundGameMaster = await User.find({
				$and:[
					{
						gamemaster: true
					},

					{
						"gamesystem.starfinder": true
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
				data: foundGameMaster
			})

			console.log("2nd if, foundGameMaster for starfinder");
		}

		else if(
				(
					foundUser.gamemaster == false && 
					foundUser.gamesystem.starfinder == true && 
					foundUser.gamestyle.dungeonCrawl == true
				) 
				|| 
				(
					foundUser.playerCharacter == true && 
					foundUser.gamesystem.starfinder == true && 
					foundUser.gamestyle.dungeonCrawl == true
				)

			) {
			let foundGameMaster = await User.find(
				{$and:[
					{
						gamemaster: true
					},

					{
						"gamesystem.starfinder": true
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
				data: foundGameMaster
			})
			console.log("3rd if, foundGameMaster for starfinder");
		}

		else if(
				(
					foundUser.gamemaster == false && 
					foundUser.gamesystem.starfinder == true
				) 
				|| 
				(
					
					foundUser.playerCharacter == true && 
					foundUser.gamesystem.starfinder == true
				)
			) {
			let foundGameMaster = await User.find(
				{$and:[
					{
						gamemaster: true
					},

					{
					 	"gamesystem.starfinder": true
					},

					{
						lookingForGroup: true
					}
				]
			})

			res.json({
				status: 200,
				data: foundGameMaster
			})
			console.log("4th if, foundGameMaster for starfinder");
		}
// <<<<----------GM looking for PC's------->>>>>>>>
		if(
			(
				foundUser.gamemaster == true && 
				foundUser.gamesystem.starfinder == true && 
				foundUser.gamestyle.roleplay == true 
			)
			|| 
			(
				foundUser.playerCharacter == false && 
				foundUser.gamesystem.starfinder == true && 
				foundUser.gamestyle.roleplay == true
			)
		) {

			let foundPC = await User.find({
				$and: [
					{
						playerCharacter: true 
					}, 
			
					{
						"gamesystem.starfinder" : true

					},

					{
						lookingForGroup: true
					}, 
					
					{
						"gamestyle.roleplay" : true}
				]

			})
			

			// console.log("\n\n\n\n\n here is what the query found")
			// console.log(foundGameMaster, "foundGameMaster");

			res.json({
				status: 200,
				data: foundPC
			})
			
			console.log("1st if, foundPC for starfinder");
		}// if

		else if(
				(
					foundUser.gamemaster == true && 
					foundUser.gamesystem.starfinder == true && 
					foundUser.gamestyle.combat == true
				) 
				|| 
				(
					foundUser.playerCharacter == false && 
					foundUser.gamesystem.starfinder == true && 
					foundUser.gamestyle.combat == true
				)
			) {

			let foundPC = await User.find({
				$and:[
					{
						playerCharacter: true
					},

					{
						"gamesystem.starfinder": true
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
				data: foundPC
			})

			console.log("2nd if, foundPC for starfinder");
		}

		else if(
				(
					foundUser.gamemaster == true && 
					foundUser.gamesystem.starfinder == true && 
					foundUser.gamestyle.dungeonCrawl == true
				) 
				|| 
				(
					foundUser.playerCharacter == false && 
					foundUser.gamesystem.starfinder == true && 
					foundUser.gamestyle.dungeonCrawl == true
				)

			) {
			let foundPC = await User.find(
				{$and:[
					{
						playerCharacter: true
					},

					{
						"gamesystem.starfinder": true
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
				data: foundPC
			})
			console.log("3rd if, foundPC, for starfinder");
		}

		else if(
				(
					foundUser.gamemaster == true && 
					foundUser.gamesystem.starfinder == true
				) 
				|| 
				(
					
					foundUser.playerCharacter == false && 
					foundUser.gamesystem.starfinder == true
				)
			) {
			let foundPC = await User.find(
				{$and:[
					{
						playerCharacter: true
					},

					{
					 	"gamesystem.starfinder": true
					},

					{
						lookingForGroup: true
					}
				]
			})

			res.json({
				status: 200,
				data: foundPC
			})
			console.log("4th if, foundPC for starfinder");
		}

	} catch(err) {
		next(err)
	}
}) //end of user index route for particular parameters
		


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





