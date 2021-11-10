const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ClimbSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	date: {
		type: Date,
		default: Date.now
	}
});

module.exports = Climb = mongoose.model('Climb', ClimbSchema);