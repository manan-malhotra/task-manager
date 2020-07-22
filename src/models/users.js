const mongoose = require('mongoose'),
	validator = require('validator'),
	bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
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
		unique   : true,
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

userSchema.statics.findByCredentials = async (email, password) => {
	const user = await User.findOne({ email });
	if (!user) {
		throw new Error('Account not found');
	}
	const isMatch = await bcrypt.compare(password, user.password);
	if (!isMatch) {
		throw new Error('Invalid password');
	}
	return user;
};

userSchema.pre('save', async function(next) {
	const user = this;

	if (user.isModified('password')) {
		user.password = await bcrypt.hash(user.password, 8);
	}

	next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
