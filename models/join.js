//require mongoose
const mongoose = require('mongoose')
// define the joinSchema
const joinSchema = new mongoose({
	gamemasterId: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: "User"
	}],
	playerCharacterIds: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: "User"
	}],
	groupId: String,
	join: {
		type: Boolean,
		default: null
	}
})
//define the join model
const Join = mongoose.model("Join", joinSchema)
//export the module

module.exports = Join; 