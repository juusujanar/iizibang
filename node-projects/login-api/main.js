var express      = require("express");
var session      = require('express-session');
var bodyParser   = require('body-parser');
var cookieParser = require('cookie-parser');
var morgan       = require('morgan');
//var redis        = require("redis").createClient();
var redisStore   = require('connect-redis')(session);
var login        = require('./routes/loginroutes');

var app = express();
app.use(morgan('dev')); // log requests to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(session({
    secret: process.env.SESSION_KEY,
//    store: new redisStore({ host: process.env.REDIS_HOST, port: 6379, ttl:  260 }),
    saveUninitialized: false,
    resave: false,
    proxy: true
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
var router = express.Router();

router.get('/', function(req, res) {
    res.json({ message: 'This is the main iiZiBang API. Nothing to see here.' });
});

router.post('/register', login.register);
router.post('/login', login.login);
router.post('/logout', login.logout);
router.get('/loggedIn', login.loggedIn);
app.use('/api', router);
app.listen(5000);
