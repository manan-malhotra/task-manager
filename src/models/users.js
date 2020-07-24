const mongoose = require('mongoose'),
	validator = require('validator'),
	bcrypt = require('bcryptjs'),
	jwt = require('jsonwebtoken');

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
	},
	tokens   : [
		{
			token : {
				type     : String,
				required : true
			}
		}
	]
});

userSchema.methods.generateAuthToken = async function() {
	const user = this;
	const token = jwt.sign({ _id: user._id.toString() }, 'thisismanan');

	user.tokens = user.tokens.concat({ token });
	await user.save();
	return token;
};

userSchema.methods.toJSON = function() {
	const user = this;
	const userObject = user.toObject();
	delete userObject.password;
	delete userObject.tokens;
	delete userObject.__v;
	delete userObject._id;

	return userObject;
};

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
