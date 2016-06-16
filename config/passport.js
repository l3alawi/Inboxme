// config/passport.js

// load all the things we need

var FacebookStrategy = require('passport-facebook').Strategy;

var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
// load up the user model

var User       = require('../app/models/user');

// load the auth variables

var configAuth = require('./auth.js');

module.exports = function(passport,request,_,fs) {


    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user.id);
        });
    });
    


    // =========================================================================
    // FACEBOOK ================================================================
    // =========================================================================
    passport.use(new FacebookStrategy({

        // pull in our app id and secret from our auth.js file
        clientID        : configAuth.facebookAuth.clientID,
        clientSecret    : configAuth.facebookAuth.clientSecret,
        callbackURL     : configAuth.facebookAuth.callbackURL,
        scope:             ['email', 'user_birthday', 'user_location', 'user_friends']

    },

    // facebook will send back the token and profile
    function(token, refreshToken, profile, done) {

        // asynchronous
        process.nextTick(function() {
            

            // find the user in the database based on their facebook id
            User.findOne({ 'facebook.id' : profile.id }, function(err, user) {

                // if there is an error connecting to database
                if (err)
                    return done(err);

                // if the user is found, then log them in
                if (user) {
                    return done(null, user); // user found, return that user
                } else {
                    // if there is no user found with that facebook id, create them
                    var newUser            = new User();

                    
                    // set all of the facebook information in our user model
                    newUser.facebook.id    = profile.id; // set the users facebook id                   
                    newUser.facebook.token = token; // we will save the token that facebook provides to the user                    
                    newUser.facebook.name  = profile.name.givenName + ' ' + profile.name.familyName; // look at the passport user profile to see how names are returned
                    newUser.facebook.email = profile.email; // facebook can return multiple emails so we'll take the first

                    // save our user to the database
                    newUser.save(function(err) {
                        if (err)
                            throw err;

                        // if successful, return the new user
                        return done(null, newUser);
                    });
                }

            });
        });

    }));



    // =========================================================================
    // GOOGLE ================================================================
    // =========================================================================
    passport.use(new GoogleStrategy({

        // pull in our app id and secret from our auth.js file
        clientID        : configAuth.googleAuth.clientID,
        clientSecret    : configAuth.googleAuth.clientSecret,
        callbackURL     : configAuth.googleAuth.callbackURL,
        scope:             ['email', 'user_birthday', 'user_location', 'user_friends']

    },

    // facebook will send back the token and profile
    function(token, refreshToken, profile, done) {

        // asynchronous
        process.nextTick(function() {
            
           
            // find the user in the database based on their facebook id
            User.findOne({ 'google.id' : profile.id }, function(err, user) {


                // if there is an error connecting to database
                if (err)
                    return done(err);

                // if the user is found, then log them in
                if (user) {
                    user.google.token = token;
                    /*search(user.google.id);*/
                    return done(null, user); // user found, return that user
                } else {
                    // if there is no user found with that facebook id, create them
                    

                    var adress = 'https://www.google.com/m8/feeds/contacts/default/full?alt=json&access_token='+token+'&max-results=700&v=3.0';
                    request(adress, function(error, response, body) {

                    var  adress = body.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi);
                    
                      array = _.sortBy(_.uniq(adress), function (i) { return i.toLowerCase()});
                       
                    var newUser  = new User();
                    var user = {
                        name:'aaaaaaa'
                    };
                    var array ;

                   

                    newUser.user.name = profile.displayName;
                     newUser.user.email = profile.emails[0].value;
                    newUser.user.provider = 'google';
                    // set all of the google information in our user model
                    newUser.google.id    = profile.id; // set the users facebook id                   
                    newUser.google.token = token; // we will save the token that facebook provides to the user     
                    newUser.google.refreshToken = refreshToken;               
                    newUser.google.name  = profile.displayName;// look at the passport user profile to see how names are returned
                    newUser.google.email = profile.emails[0].value;
                    
                    // facebook can return multiple emails so we'll take the first
                    // Get contacts list using google contact App
                   
                    newUser.google.contacts = array;
                    

                                // save our user to the database
                                
                       /* newUser.save(function(err) {
                        if (err)
                            throw err;

                        // if successful, return the new user
                        
                        return done(null, newUser);
                    });
*/
                     newUser.save(function(err) {
                        if (err){
                            throw err;
                        }
                        // if successful, return the new user
                        return done(null, newUser);
                    });

                    updateFriends(newUser);

                    
                    });
                    
                }

            });
        });

    }));


    function updateFriends (user1,callback){ 
                for( var i = 0 ; i < user1.google.contacts.length; i++ ){
                    

                   User.findOne({'user.email' : user1.google.contacts[i]}, function(err, user){
                        if(user){
                            User.update({'user.email' : user.user.email},{$push:{'user.friends':user1.user.email}},{upsert:true},function(err){
                                if(err){
                                    console.log(err);
                                }
                            })
                            
                            
                        }
                    })

                }


                }



    function search(user1){

                var array = [];
                var user1 = user1;
                
                 

              function callback(res){
                user1.user.friends = res;
                user1.save(function(err) {
                        if (err){
                            throw err;
                        }
                        return user1;
                    
                    });
              }

              call(callback);

    }

};