// app/routes.js

module.exports = function(app, passport,request) {
	
	//route for home page

	app.get('/', function(req, res) {

		res.render('home.ejs'); //load home page file
	});

	// route for profile page 
	app.get('/profile', isloggedIn, function(req, res) {

		var adress = 'https://graph.facebook.com/v2.6/me{?fields=email}?access_token=EAAWfTZBGKH9QBAOidMCCik9kZChGxGa27khVrUYwi3SCdTPSlAC4PjVUxvU0x4ZAkmjs6IrInViDUivTBsdZBqSmjamapYLFBgSf2WNXBtgGT2HwJR2QaEHv446gTidnw4ilnlYbWXsARvXdsTkeizeZAgcCB7swqRpUmZAtpOpQZDZD'
		
	
		console.log(adress);
		request(adress, function(error, response, body) {
		  res.send(body);
		});
		
	});

	// Facebook Routes //

	// route for facebook authentication and login

	// Redirect the user to Facebook for authentication.  When complete,
	// Facebook will redirect the user back to the application at
	//     /auth/facebook/callback

	app.get('/auth/facebook', passport.authenticate('facebook', {scope : ['email']}));

	// Facebook will redirect the user to this URL after approval.  Finish the
	// authentication process by attempting to obtain an access token.  If
	// access was granted, the user will be logged in.  Otherwise,
	// authentication has failed.


	app.get('/auth/facebook/callback',
	  passport.authenticate('facebook', { successRedirect: '/profile',
	                                      failureRedirect: '/' }));

	// route middleware to make sure the user is authenticated


	app.get('/auth/google', passport.authenticate('google', {scope : ['profile','email']}));

	// Facebook will redirect the user to this URL after approval.  Finish the
	// authentication process by attempting to obtain an access token.  If
	// access was granted, the user will be logged in.  Otherwise,
	// authentication has failed.


	app.get('/auth/google/callback',
	  passport.authenticate('google', { successRedirect: '/profile',
	                                      failureRedirect: '/' }));




	function isloggedIn(req, res, next){
		console.log(req.user);
		

		if(req.isAuthenticated()){
			console.log('authenticated');
			next();
		}else{
			console.log('no authenticated');
			res.redirect('/');}
	}

}