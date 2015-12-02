// Import mongoose
var mongoose = require('mongoose');

// Alias for mongoose.Schema
var Schema = mongoose.Schema;

// Define Schema
var TDSchema = new Schema({
	name: String,
	phone: String,
	email: String,
	created: {
        type: Date,
        default: Date.now
    },
	updated: Date
}, {
	collection: 'todoList'
});

module.exports = mongoose.model('Todo', TDSchema);