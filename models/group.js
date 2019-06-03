//require mongoose
const mongoose = require('mongoose')

//create the group schema
const groupSchema = new mongoose.Schema({
	gamemaster: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: "User"
	}],
	playerCharacters: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: "User"
	}],
	requestsReceived: [{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Join"
	}],
	title: String,
	description: String
})
//create the group model
const Group = mongoose.model("Group", groupSchema)
//export

module.exports = Group;