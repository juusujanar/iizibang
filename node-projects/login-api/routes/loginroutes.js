var mysql = require('mysql');
var bcrypt = require('bcrypt');
var connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

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
    connection.query('call addUser (?,?,?,?,?,?,?,@results)', [req.body.username, req.body.firstname,
        req.body.lastname, req.body.gender, req.body.email, req.body.birthdate,
        bcrypt.hashSync(req.body.password, 10)], function(error, results, fields) {

        if (error) {
            console.log("Error when registering user in database: ", error);
            res.send({
                "code": 400,
                "failed": "Error when registering user in database!"
            });
            return;
        } else {
            if (results[0][0]["@result"] == 200) {
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
            }
        }
    });
};

exports.login = function(req, res) {
    var email = req.body.email;
    var password = req.body.password;

    connection.query('call getUserPassword (?,@results)', [email], function(error, results, fields) {
        if (error) {
            console.log("Error while getting login info from DB: ", error);
            res.send({
                "code": 400,
                "failed": "Login failed."
            });
        } else {
            if(bcrypt.compareSync(password, results[0][0]["@p_password"])) {
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
        }
    });
};
