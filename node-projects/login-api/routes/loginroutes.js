var mysql = require('mysql');
var bcrypt = require('bcrypt');
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
                        /*if (results[0][0]["@result"] == 200) {
                            res.send({
                                "code": 200,
                                "success": "User successfully registered."
                            });
                        }
                        else {
                            res.send({
                                "code": 300,
                                "failed": "User registering failed."
                            });
                        }*/
                        console.log(results);
                        res.send({
                            "code": 200,
                            "success": "User successfully registered."
                        });
                    }
                });
            });
        });
    };

exports.login = function(req, res) {

    connection.query('call getUserPassword (?,@results)', [req.body.email], function(error, results, fields) {
        if (error) {
            console.log("Error while getting login info from DB: ", error);
            res.send({
                "code": 400,
                "failed": "Login failed."
            });
        } else {
            bcrypt.compare(req.body.password, results[0][0]["@p_password"], function(err, result) {
                if (result) {
                    res.send({
                        "code": 200,
                        "success": "Login successful."
                    });
                } else {
                    res.send({
                        "code": 300,
                        "failed": "User login failed."
                    });
                }
            });
        }
    });
};
