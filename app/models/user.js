var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
	user : { // short presentation of the schema
		email: String,
		provider: String,
		friends :[String]
	},

	message: { // all messages
		receive: [{
			from: String,
			message: String
		}],

		send: [{
			to: String,
			message:String
		}]

	},

	facebook : { // facebook information
		id : String,
		token : String,
		email : String,
		name : String
		
	},

	google : { // google information
		id : String,
		token : String,
		email : String,
		name : String,
		refreshToken : String,
		contacts: [String]
	}
});

module.exports = mongoose.model('User', userSchema);