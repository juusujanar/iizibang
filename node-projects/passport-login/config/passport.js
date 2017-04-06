var LocalStrategy   = require('passport-local').Strategy;
var mysql           = require('mysql');
var bcrypt          = require('bcrypt');
var connection      = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

const saltRounds = 10;

connection.connect(function(err) {
    if (!err) {
        console.log("Successfully connected to database.");
    } else {
        console.log("Error connecting to the database");
    }
});

module.exports = function(passport) {

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        connection.query("SELECT * FROM users WHERE id = ? ",[id], function(err, rows){
            done(err, rows[0]);
        });
    });

    // =========================================================================
    // SIGNUP ==================================================================
    // =========================================================================

    passport.use(
        'local-signup',
        new LocalStrategy({
            usernameField : 'username',
            passwordField : 'password',
            passReqToCallback : true
        },
        function(req, username, password, done) {

            connection.query("SELECT * FROM users WHERE username = ? OR email = ?", [username, username], function(err, rows) {
                if (err)
                    return done(err);
                if (rows.length) {
                    return done(null, false, req.flash('signupMessage', 'That username or email is already taken.'));
                } else {
                    // Create new user
                    bcrypt.hash(password, saltRounds, function(err, hash) {
                        connection.query('INSERT INTO users (username, firstname, lastname, email, birthdate, password_hash, gender, interest) VALUES (?,?,?,?,?,?,?,?)', [username, req.body.firstname,
                            req.body.lastname, req.body.email, req.body.birthdate, hash, req.body.gender, req.body.interest], function(err, rows) {
                                return done(null, rows.insertId);
                        });
                    });
                }
            });
        })
    );

    // =========================================================================
    // LOGIN ===================================================================
    // =========================================================================

    passport.use(
        'local-login',
        new LocalStrategy({
            usernameField : 'username',
            passwordField : 'password',
            passReqToCallback : true
        },
        function(req, username, password, done) {
            connection.query("SELECT * FROM users WHERE username = ? OR email = ?", [username, username], function(err, rows){
                if (err)
                    return done(err);
                if (!rows.length) {
                    return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash
                }

                // if the user is found but the password is wrong
                bcrypt.compare(password, rows[0].password_hash, function (err,result) {
                    if (!result) {
                        return done(null, false, req.flash('loginMessage', 'Wrong password.'));
                    }
                    else {
                        return done(null, rows[0].id);
                    }
                });
            });
        })
    );
};
