//Planning 

//I will need three models: 
// User model and Group model and Request Join model

// "_id": "5cf82dacd978dd3d94434f0f",




// <----------------------------What one get route looks like when using mongoose and mongo queries---------->>>>>>>
//user index route to display users that match certain parameters
// router.get('/match', async (req,res,next) => {
// 	console.log(req.session.userDBId, 'here is the req.session.userDBId');
// 	console.log("^^^^^^^^^^^^^^^^^ req.session.userDBId");
// 	console.log(req.session, 'here is the req.session');
// 	// console.log(User, "here is the User");
// 	try {
// 		const foundUser = await User.findById(req.session.userDBId) //will need req.session._id
// 		console.log(foundUser, "foundUser");
// 		console.log(foundUser, "here is the foundUser");
// 		console.log(foundUser.gamesystem.callOfCthulu, "here is the gamesystem");
// 		// res.json({
// 		// 	status: 200,
// 		// 	data: foundUser
// 		// })

// 		//<--------------GM/PC LOOKING FOR D&D 5E GROUP---------------->

// 		console.log("1st if");
// 		//<-----PC looking for GM----->>>>>>
// 		if(
// 			(
// 				foundUser.gamemaster == false && 
// 				foundUser.gamesystem.callOfCthulu == true && 
// 				foundUser.gamestyle.roleplay == true 
// 			)
// 			|| 
// 			(
// 				foundUser.playerCharacter == true && 
// 				foundUser.gamesystem.callOfCthulu == true && 
// 				foundUser.gamestyle.roleplay == true
// 			)
// 		) {

// 			let foundGameMaster = await User.find({
// 				$and: [
// 					{
// 						gamemaster: true
// 					}, 
// 					// {
// 					// 	gamesystem: {
// 					// 		callOfCthulu: true
// 					// 	}
// 					// }, 
// 					{"gamesystem.callOfCthulu" : true},
// 					{
// 						lookingForGroup: true
// 					}, 
// 					// {
// 					// 	gamestyle: {
// 					// 		roleplay: true
// 					// 	}
// 					// }
// 					{"gamestyle.roleplay" : true}
// 				]
// 			})

// 		//--------vvvvvv----Callback stuff Cursor is important
// 			// .cursor()
// 			// .on('data', (doc) => {
// 			// 	console.log("here's a doc");
// 			// 	console.log(doc);
// 			// })
// 			// .on('end', () => {
// 			// 	console.log("done");
// 			// 	res.send('check terminal')
// 			// })
// 			// .then((data) => {
// 			// 	console.log("data");
// 			// 	console.log(data);
// 			// 	res.send('check terminal')
// 			// })
// 			// .catch((error) => {
// 			// 	console.log("Error");
// 			// 	console.log(error)
// 			// })

// 			// console.log("\n\n\n\n\n here is what the query found")
// 			// console.log(foundGameMaster, "foundGameMaster");

// 			res.json({
// 				status: 200,
// 				data: foundGameMaster
// 			})
		
// 		}// if




if(
			(
				foundUser.gamemaster == false && 
				foundUser.gamesystem.callOfCthulu == true && 
				foundUser.gamestyle.roleplay == true 
			)
			|| 
			(
				foundUser.playerCharacter == true && 
				foundUser.gamesystem.callOfCthulu == true && 
				foundUser.gamestyle.roleplay == true
			)
		) {

			let foundGameMaster = await User.find({
				$and: [
					{
						gamemaster: true
					}, 
			
					{
						"gamesystem.callOfCthulu" : true

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

			console.log("1st if, foundGameMaster for callOfCthulu");
		}// if

		else if(
				(
					foundUser.gamemaster == false && 
					foundUser.gamesystem.callOfCthulu == true && 
					foundUser.gamestyle.combat == true
				) 
				|| 
				(
					foundUser.playerCharacter == true && 
					foundUser.gamesystem.callOfCthulu == true && 
					foundUser.gamestyle.combat == true
				)
			) {

			let foundGameMaster = await User.find({
				$and:[
					{
						gamemaster: true
					},

					{
						"gamesystem.callOfCthulu": true
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

			console.log("2nd if, foundGameMaster for callOfCthulu");
		}

		else if(
				(
					foundUser.gamemaster == false && 
					foundUser.gamesystem.callOfCthulu == true && 
					foundUser.gamestyle.dungeonCrawl == true
				) 
				|| 
				(
					foundUser.playerCharacter == true && 
					foundUser.gamesystem.callOfCthulu == true && 
					foundUser.gamestyle.dungeonCrawl == true
				)

			) {
			let foundGameMaster = await User.find(
				{$and:[
					{
						gamemaster: true
					},

					{
						"gamesystem.callOfCthulu": true
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
			console.log("3rd if, foundGameMaster for callOfCthulu");
		}

		else if(
				(
					foundUser.gamemaster == false && 
					foundUser.gamesystem.callOfCthulu == true
				) 
				|| 
				(
					
					foundUser.playerCharacter == true && 
					foundUser.gamesystem.callOfCthulu == true
				)
			) {
			let foundGameMaster = await User.find(
				{$and:[
					{
						gamemaster: true
					},

					{
					 	"gamesystem.callOfCthulu": true
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
			console.log("4th if, foundGameMaster for callOfCthulu");
		}
// <<<<----------GM looking for PC's------->>>>>>>>
		if(
			(
				foundUser.gamemaster == true && 
				foundUser.gamesystem.callOfCthulu == true && 
				foundUser.gamestyle.roleplay == true 
			)
			|| 
			(
				foundUser.playerCharacter == false && 
				foundUser.gamesystem.callOfCthulu == true && 
				foundUser.gamestyle.roleplay == true
			)
		) {

			let foundPC = await User.find({
				$and: [
					{
						playerCharacter: true 
					}, 
			
					{
						"gamesystem.callOfCthulu" : true

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
			
			console.log("1st if, foundPC for callOfCthulu");
		}// if

		else if(
				(
					foundUser.gamemaster == true && 
					foundUser.gamesystem.callOfCthulu == true && 
					foundUser.gamestyle.combat == true
				) 
				|| 
				(
					foundUser.playerCharacter == false && 
					foundUser.gamesystem.callOfCthulu == true && 
					foundUser.gamestyle.combat == true
				)
			) {

			let foundPC = await User.find({
				$and:[
					{
						playerCharacter: true
					},

					{
						"gamesystem.callOfCthulu": true
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

			console.log("2nd if, foundPC for callOfCthulu");
		}

		else if(
				(
					foundUser.gamemaster == true && 
					foundUser.gamesystem.callOfCthulu == true && 
					foundUser.gamestyle.dungeonCrawl == true
				) 
				|| 
				(
					foundUser.playerCharacter == false && 
					foundUser.gamesystem.callOfCthulu == true && 
					foundUser.gamestyle.dungeonCrawl == true
				)

			) {
			let foundPC = await User.find(
				{$and:[
					{
						playerCharacter: true
					},

					{
						"gamesystem.callOfCthulu": true
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
			console.log("3rd if, foundPC, for callOfCthulu");
		}

		else if(
				(
					foundUser.gamemaster == true && 
					foundUser.gamesystem.callOfCthulu == true
				) 
				|| 
				(
					
					foundUser.playerCharacter == false && 
					foundUser.gamesystem.callOfCthulu == true
				)
			) {
			let foundPC = await User.find(
				{$and:[
					{
						playerCharacter: true
					},

					{
					 	"gamesystem.callOfCthulu": true
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
			console.log("4th if, foundPC for callOfCthulu");
		}




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
		// 	foundUser.gamesystem.callOfCthulu == true || foundUser.gamesystem.callOfCthulu == true || foundUser.gamesystem.callOfCthulu == true) {
		// 	const findGameSystem = await User.find({$or:[{gamesystem: {dnd5e: true}},{gamesystem: {pathfinder: true}},{gamesystem: {callOfCthulu: true}},{gamesystem: {callOfCthulu: true}},{gamesystem: {callOfCthulu: true}} ]})
		// 	res.json({
		// 		status: 200,
		// 		data: findGameSystem
		// 	})
		// }




