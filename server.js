var express = require('express');
var app = express();

var http = require('http').Server(app);

var io = require('socket.io')(http);


var cookieParser = require('cookie-parser');
var session = require('express-session');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var passport = require('passport');
var flash = require('connect-flash');
var path = require('path');
var request = require("request");
var _= require('underscore');
var lusca = require('lusca');



var google = require('googleapis');

var GoogleContacts = require('google-contacts').GoogleContacts;


var configDB = require('./config/database.js');
mongoose.connect(configDB.url);
require('./config/passport.js')(passport,request,_);

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(session({secret: 'anystringoftext',
				 saveUninitialized: true,
				 resave: true}));

app.use(lusca({
    csrf: true,
    xframe: 'SAMEORIGIN',
    p3p: 'ABCDEF',
    hsts: {maxAge: 31536000, includeSubDomains: true, preload: true},
    xssProtection: true,
    nosniff: true
}));

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session




app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, 'public', 'views'));
app.use(express.static(path.resolve(__dirname, 'public')));



require('./app/routes.js')(app, passport,request,google,GoogleContacts,_,bodyParser,io);






http.listen(3000, function(req, res){
	console.log("sever is runing");
})