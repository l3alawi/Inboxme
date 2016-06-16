var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
	user : { // short presentation of the schema
		email: String,
		name: String,
		provider: String,
		friends :[String]
	},

					// all messages
	messageReceive: [{
			from: String,
			subject:String,
			message: String,
			date:String
		}],

	messageSend: [{
			to: String,
			subject:String,
			message:String,
			date:String
		}],

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