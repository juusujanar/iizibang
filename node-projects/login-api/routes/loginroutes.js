var mysql = require('mysql');
var bcrypt = require('bcrypt');
var crypto = require('crypto');
var connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

const saltRounds = 10;

/**
* Return codes
* 200 - Login/register successful
* 300 - Login/register failed - non-existant account, already existing account
or mismatching password
* 400 - Some other error
*/


connection.connect(function(err) {
    if (!err) {
        console.log("Successfully connected to database.");
    } else {
        console.log("Error connecting to the database");
    }
});

exports.register = function(req, res) {

    bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(req.body.password, salt, function(err, hash) {

            connection.query('SELECT * FROM users WHERE username = ? OR email = ?', [req.body.username, req.body.email], function(error, results, fields) {
                if (results.length) {
                    res.send({
                        "code": 300,
                        "failed": "User/email already exists in database!"
                    });
                    return;
                }
            });

            connection.query('call addUser (?,?,?,?,?,?,?,?,@results)', [req.body.username, req.body.firstname,
                req.body.lastname, req.body.email, req.body.birthdate, hash, req.body.gender, req.body.interest],
                function(error, results, fields) {

                    if (error) {
                        console.log("Error when registering user in database: ", error);
                        res.send({
                            "code": 400,
                            "failed": "Error when registering user in database!"
                        });
                        return;
                    } else {
                        res.send({
                            "code": 200,
                            "success": "User successfully registered.",
                        });
                    }
            });
        });
    });
};

exports.login = function(req, res) {

    connection.query('SELECT * FROM users WHERE email = ? OR username = ?', [req.body.email], function(error, results, fields) {
        if (error) {
            console.log("Error while getting login info from DB: ", error);
            res.send({
                "code": 400,
                "failed": "Login failed."
            });
            return;
        } else {
            bcrypt.compare(req.body.password, results[0]["password_hash"], function(err, result) {
                if (result) {
                    // saves login to session store
                    
                    var sess = req.session;
                    sess.userdata = results[0];
                    res.send({
                        "code": 200,
                        "success": "Login successful.",
                    });
                } else {
                    res.send({
                        "code": 400,
                        "failed": "User login failed.",
                    });
                    return;
                }
            });
        }
    });
};

exports.loggedIn = function(req, res) {
    if (req.session.userdata) {
        res.send({
            "code": 200,
            "loggedIn": "true"
        });
    } else {
        res.send({
            "code": 200,
            "loggedIn": "false"
        });
    }
};

exports.logout = function(req, res) {
    req.session.destroy();
    res.send({
        "code": 200
    });
};

// Functions for generating random session IDs
function genUuid(callback) {
    if (typeof(callback) !== 'function') {
        return uuidFromBytes(crypto.randomBytes(16));
    }
    crypto.randomBytes(16, function(err, rnd) {
        if (err) return callback(err);
        callback(null, uuidFromBytes(rnd));
    });
}

function uuidFromBytes(rnd) {
    rnd[6] = (rnd[6] & 0x0f) | 0x40;
    rnd[8] = (rnd[8] & 0x3f) | 0x80;
    rnd = rnd.toString('hex').match(/(.{8})(.{4})(.{4})(.{4})(.{12})/);
    rnd.shift();
    return rnd.join('-');
}
