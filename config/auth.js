//config/auth.js

//expose our config directly to our app
module.exports = {
	'facebookAuth' : {
		'clientID' : '1582540318711764', // App ID
		'clientSecret' : 'c8060bce27a0d80f0d6eed5983d489c9', // Secret Ky
		'callbackURL' : 'http://localhost:3000/auth/facebook/callback', // facebook callback when finishing athentication
        "profileFields": ["id", "birthday", "email", "first_name", "gender", "last_name"],
	},

	'googleAuth' : {
		'clientID' : '185238856327-l6vtvq23nq3mrod7jpc81cp2m9gvekpv.apps.googleusercontent.com', // App ID
		'clientSecret' : 'L5ysrxnJ70PL9DTtZVkOSbBm', // Secret Ky
		'callbackURL' : 'http://localhost:3000/auth/google/callback', // facebook callback when finishing athentication
	}
}
