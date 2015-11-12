// Import mongoose
var mongoose = require('mongoose');

// need an alias for mongoose.Schema
var Schema = mongoose.Schema;

// Define our user Schema
var BCSchema = new Schema({
	name: String,
	phone: String,
	email: String,
	created: {
        type: Date,
        default: Date.now
    },
	updated: Date
}, {
	collection: 'businessContact'
});

module.exports = mongoose.model('Businesscontact', BCSchema);