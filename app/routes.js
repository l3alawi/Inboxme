// app/routes.js


var User       = require('../app/models/user');

module.exports = function(app, passport,request,google,GoogleContacts,_,bodyParser,fs) {
	
	//route for home page

	app.get('/', function(req, res) {

		res.render('home.ejs'); //load home page file
	});

	// route for profile page 
	app.get('/inbox', isloggedIn, function(req, res) {

		res.render('index.ejs');

		 
		});
	app.get('/profile',isloggedIn,function(req, res){

		User.findById(req.user, function(err, user) {
			searsh = req.query.searsh;
       		console.log(searsh);
            var tags = createTags(user.google.contacts);
            var data2 = tags.filter(function(elm){
    		return elm.text.indexOf(searsh) != -1 ;
    });

   			res.json(data2);
            
        });
    });

    app.get('/friendsApp',isloggedIn,function(req, res){

		User.findById(req.user, function(err, user) {
			searsh = req.query.searsh;
       		console.log(searsh);
            var tags = createTags(user.user.friends);
            var data2 = tags.filter(function(elm){
    		return elm.text.indexOf(searsh) != -1 ;
    });

   			res.json(data2);
            
        });
    });


     app.get('/home', isloggedIn, function(req, res) {

     	console.log('aaaa');

		User.findById(req.user, function(err, user){
			if(user){
				res.json(user);
			} else {
				console.log(err);
			}
		})



		 
		});

     app.post('/send',isloggedIn, function(req, res){


     	console.log(req.user);
     	var body = req.body;
     	User.findById(req.user, function(err, user1){
			if(user1){

				var array = [];
				for( var i = 0; i< req.body.to.length; i++){
					User.findOne({'user.email' : req.body.to[i]}, function(err, user){
						console.log(user);
                        if(user){
                            User.update({'user.email' : user.user.email},{$push:{'messageReceive':{from: user1.user.name, subject: req.body.subject, message: req.body.message,date:req.body.date}}},{upsert:true},function(err){
                                if(err){
                                    console.log(err);
                                }
                            })
                            
                            
                        } else {
                       console.log('aaaaaa');
							}
				
				})

			
		}

		if(i = req.body.to.length){
			res.json(array);
		}

		User.update({'user.email' : user1.user.email},{$push:{'messageSend':{to:body.to, subject:body.subject, message:body.message,date:body.date}}},{upsert:true},function(err){
                                if(err){
                                    console.log(err);
                                }
                            });
	}
		})
     	

     	

     })
        

   
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


	app.get('/auth/google', passport.authenticate('google', {scope : ['profile','email','https://www.google.com/m8/feeds/','https://www.googleapis.com/auth/contacts.readonly']}));

	// Facebook will redirect the user to this URL after approval.  Finish the
	// authentication process by attempting to obtain an access token.  If
	// access was granted, the user will be logged in.  Otherwise,
	// authentication has failed.
	//'https://www.googleapis.com/auth/gmail.readonly','https://www.googleapis.com/auth/gmail.modify'


	app.get('/auth/google/callback',
	  passport.authenticate('google', { successRedirect: '/inbox',
	                                      failureRedirect: '/' }));



	// -----------------------------------

		var gmail = google.gmail('v1');
		var OAuth2 = google.auth.OAuth2;
		var oauth2Client = new OAuth2('109778812883181801804', 'L5ysrxnJ70PL9DTtZVkOSbBm', '/');
		var adress = [];

		// Retrieve tokens via token exchange explained above or set them:
		oauth2Client.setCredentials({
		  access_token: 'ya29.Ci__AjGPI2pQILC6SMH9DDr6mH1sVQvfiuc54xBzW13H7Q9mUjwim6SPexqGMbHTZQ'
		});

		/*gmail.users.messages.list({ userId: 'me', auth: oauth2Client }, function(err, response) {
			if(err){
				console.log(err);
			}

			for( var j = 0; j< response.messages.length - 2 ; j++ ){
				console.log(j);
			gmail.users.messages.get({userId :'me', id:response.messages[j].id,auth: oauth2Client}, function(err, response){
				for(var i = 0; i< response.payload.headers.length - 2 ; i++){
					console.log('2'+'-----'+ response.payload.headers.length);
					if(response.payload.headers[i].name == 'Reply-To'){
						adress.push(response.payload.headers[i].value);
						console.log(adress);
					}
				}
			});
		}
	})*/

		


			

		
			/*for(var i =0; i< 10; i++){
			gmail.users.messages.get({userId :'me', id:response.messages[i].id,auth: oauth2Client}, function(err, response){
				console.log(response.payload.headers[16]);
			});
		}
		 
		

	/*var url = oauth2Client.generateAuthUrl({
			  access_type: 'offline', // 'online' (default) or 'offline' (gets refresh_token)
			  scope: scopes // If you only need one scope you can pass it as string
			});
	console.log('----------------------------------');
	console.log(url);


		request(url, function(error, response, body) {
		  console.log(body);
		});
*/

function addMessage (body, id){

	User.findById(id, function(err, user){
			if(user){
				User.update({'user.email' : user.user.email},{$push:{'messageSend':{to:body.to, subject:body.subject, message:body.message}}},{upsert:true},function(err){
                                if(err){
                                    console.log(err);
                                }
                            });

			} else {
				console.log(err);
			}
		})
}




	function isloggedIn(req, res, next){
		
		

		if(req.isAuthenticated()){
			console.log('authenticated');
			next();
		}else{
			console.log('no authenticated');
			res.redirect('/');}
	}

	function createTags(array){
 	var tags =[];
 	for(var i = 0 ; i< array.length ; i++){
 		var add = {
 			text:String
 		};
 		add.text = array[i];
 		tags.push(add);
 	}
 	return tags;
 }

}