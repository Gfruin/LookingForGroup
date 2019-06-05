//require mongoose
const mongoose = require('mongoose')
// define the joinSchema
const joinSchema = new mongoose.Schema({
	// gamemasterId: [{
	// 	type: mongoose.Schema.Types.ObjectId,
	// 	ref: "User"
	// }],
	// playerCharacterId: [{
	// 	type: mongoose.Schema.Types.ObjectId,
	// 	ref: "User"
	// }], // -----> can just identify by user
	message: String,
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User"
	},
	groupId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Group"
	},
	joined: {
		type: Boolean,
		default: false
	},
	resolved: {
		type: Boolean,
		default: false
	}

	//
})
//define the join model
const Join = mongoose.model("Join", joinSchema)
//export the module

module.exports = Join; 