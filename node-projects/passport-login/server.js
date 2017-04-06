var express         = require('express');
var session         = require('express-session');
var cookieParser    = require('cookie-parser');
var bodyParser      = require('body-parser');
var morgan          = require('morgan');
var app             = express();
var port            = 8000;
var passport        = require('passport');
var flash           = require('connect-flash');

require('./config/passport')(passport);

app.use(morgan('dev')); // log requests to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({
	secret: 'thisisabigsecret',
	resave: true,
	saveUninitialized: true
 } ));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


// routes ======================================================================
require('./app/routes.js')(app, passport);

// launch ======================================================================
app.listen(port);
console.log('iiZiBang Passport Login API started on port ' + port);
