var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
	user : {
		email: String,
		provider: String,
		friends :[String]
	},

	facebook : {
		id : String,
		token : String,
		email : String,
		name : String
		
	},

	google : {
		id : String,
		token : String,
		email : String,
		name : String,
		refreshToken : String,
		contacts: [String]
	}
});

module.exports = mongoose.model('User', userSchema);