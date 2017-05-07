var express      = require("express");
var session      = require('express-session');
var bodyParser   = require('body-parser');
var cookieParser = require('cookie-parser');
var morgan       = require('morgan');
//var redis        = require("redis").createClient();
var redisStore   = require('connect-redis')(session);
//var passport     = require('passport');
var app          = express();

var login        = require('./routes/loginroutes');
var matchmaking  = require('./routes/matchmakingroutes');

// Multer configuration, needed for picture upload
var multer  = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '/var/www/html/iizibang/uploads/profilepics');
    },
    filename: function (req, file, cb) {
        cb(null, +new Date() + "-" + randomInt(1000000, 9999999) + "-" + path.extname(file.originalname));
    }
});

function randomInt (low, high) {
    return Math.floor(Math.random() * (high - low) + low);
}

var upload = multer({ storage: storage, limits: { fileSize: 3145728 } });

//require('./config/passport')(passport); // pass passport for configuration

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

router.post('/register', upload.single('picture'), login.register);
router.post('/login', login.login);
router.post('/logout', login.logout);
router.get('/loggedIn', login.loggedIn);

router.get('/totalUsers', login.totalUsers);

router.get('/findmatches', matchmaking.findmatch);
router.get('/acceptmatch', matchmaking.acceptmatch);
router.get('/rejectmatch', matchmaking.rejectmatch);

router.get('/successfulmatches', matchmaking.getsuccessfulmatches);
router.get('/chathistory', matchmaking.getchathistory);
router.post('/sendchatmessage', matchmaking.sendchatmessage);

app.use('/api', router);
app.listen(5000);
