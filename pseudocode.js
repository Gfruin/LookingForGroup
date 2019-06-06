//Planning 

//I will need three models: 
// User model and Group model and Request Join model

"_id": "5cf82dacd978dd3d94434f0f",




// <----------------------------What one get route looks like when using mongoose and mongo queries---------->>>>>>>
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

		console.log("1st if");
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
					// {
					// 	gamesystem: {
					// 		dnd5e: true
					// 	}
					// }, 
					{"gamesystem.dnd5e" : true},
					{
						lookingForGroup: true
					}, 
					// {
					// 	gamestyle: {
					// 		roleplay: true
					// 	}
					// }
					{"gamestyle.roleplay" : true}
				]
			})

		//--------vvvvvv----Callback stuff Cursor is important
			// .cursor()
			// .on('data', (doc) => {
			// 	console.log("here's a doc");
			// 	console.log(doc);
			// })
			// .on('end', () => {
			// 	console.log("done");
			// 	res.send('check terminal')
			// })
			// .then((data) => {
			// 	console.log("data");
			// 	console.log(data);
			// 	res.send('check terminal')
			// })
			// .catch((error) => {
			// 	console.log("Error");
			// 	console.log(error)
			// })

			// console.log("\n\n\n\n\n here is what the query found")
			// console.log(foundDungeonMaster, "foundDungeonMaster");

			res.json({
				status: 200,
				data: foundDungeonMaster
			})
		
		}// if
