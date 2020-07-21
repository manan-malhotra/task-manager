const mongoose = require('mongoose');
const { model } = require('./users');

const Task = mongoose.model('Task', {
	description : {
		type     : String,
		trim     : true,
		required : true
	},
	completed   : {
		type    : Boolean,
		default : false
	}
});

module.exports = Task;
