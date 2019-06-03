//require mongoose
const mongoose = require('mongoose')

//define the schema
const userSchema = new mongoose.Schema({
	gamemaster: Boolean,
	available: Boolean,
	gameMaterials: String,
	experience: Number,
	description: String,
	firstName: String,
	lastName: String,
	userName: String,
	email: String,
	location: {
		address: String,
		latitude: String,
		longitude: String,
		zipCode: String
	},
	gamesystem: {
		dnd5e: Boolean,
		pathfinder: Boolean,
		starfinder: Boolean,
		dnd3_5: Boolean,
		callOfCthulu: Boolean,
		other: String
	},
	gamestyle: {
		roleplay: Boolean,
		combat: Boolean,
		dungeonCrawl: Boolean,
		other: String
	},

})

//define the model
const User = mongoose.model('User', userSchema)
//export the data

module.exports = User;