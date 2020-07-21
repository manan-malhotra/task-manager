const mongoose = require('mongoose'),
	validator = require('validator');

const User = mongoose.model('User', {
	name     : {
		type     : String,
		required : true
	},
	password : {
		type      : String,
		required  : true,
		trim      : true,
		minlength : 8,
		validate(value) {
			if (value.toLowerCase() === 'password') {
				throw new Error('Password should not be password');
			}
		}
	},
	email    : {
		type     : String,
		required : true,
		validate(value) {
			if (!validator.isEmail(value)) {
				throw new Error('Invalid email');
			}
		}
	},
	age      : {
		type    : Number,
		default : 0
	}
});

module.exports = User;
