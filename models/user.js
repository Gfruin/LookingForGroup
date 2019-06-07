//require mongoose
const mongoose = require('mongoose')

//define the schema
const userSchema = new mongoose.Schema({
	gamemaster: {type: Boolean, default: false},
	playerCharacter: {type: Boolean, default: false}, //maybe take out? 
	lookingForGroup: {type: Boolean, default: false},
	gameMaterials: {type: String, default: null},
	experience: {type: Number, default: 0},
	description: {type: String, default: null},
	firstName: {type: String, default: null},
	lastName: {type: String, default: null},
	password: {type: String, default: null},
	username: {
		type: String,
		required: true,
		unique: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	// may need to change the structure of the location object data
	// geoJson? 
	location: {
		address: {type: String, default: null},
		latitude: {type: String, default: null},
		longitude: {type: String, default: null},
		zipCode: {type: String, default: null}
	},
	gamesystem: {
		dnd5e: {type: Boolean, default: false},
		pathfinder: {type: Boolean, default: false},
		starfinder: {type: Boolean, default: false},
		dnd3_5: {type: Boolean, default: false},
		callOfCthulu: {type: Boolean, default: false},
		other: {type: String, default: null}
	},
	gamestyle: {
		roleplay: {type: Boolean, default: false},
		combat: {type: Boolean, default: false},
		dungeonCrawl: {type: Boolean, default: false},
		other: {type: String, default: null}
	},
	//maybe add group field of groups that the user is in

})

//define the model
const User = mongoose.model('User', userSchema)
//export the data

module.exports = User;