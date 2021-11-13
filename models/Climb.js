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

const Climb = mongoose.model('Climb', ClimbSchema);

export default Climb;