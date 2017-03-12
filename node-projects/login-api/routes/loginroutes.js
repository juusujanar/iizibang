var mysql = require('mysql');
var bcrypt = require('bcrypt');
var connection = mysql.createConnection({
    host: '[removed]',
    user: '[removed]',
    password: '[removed]',
    database: '[removed]'
});

connection.connect(function(err) {
    if (!err) {
        console.log("Successfully connected to database.");
    } else {
        console.log("Error connecting to the database");
    }
});

exports.register = function(req, res) {
    var users = {
        "firstname": req.body.firstname,
        "lastname": req.body.lastname,
        "email": req.body.email,
        "idcode": req.body.idcode,
        "password_hash": bcrypt.hashSync(req.body.password, 10),
    };
    connection.query('SELECT * FROM users WHERE email = ? OR username = ?', [req.body.email, req.body.email], function(error, results, fields) {
        if (error) {
            console.log("Error when checking user in database: ", error);
            res.send({
                "code": 400,
                "failed": "Error when checking user in database!"
            });
            return;
        } else {
            if (results.length > 0) {
                res.send({
                    "code": 300,
                    "success": "User/email already exists in database."
                });
            } else {
                connection.query('INSERT INTO users SET ?', users, function(error, results, fields) {
                    if (error) {
                        console.log("Error when adding user to database: ", error);
                        res.send({
                            "code": 400,
                            "failed": "Error when adding user to database!"
                        });
                    } else {
                        res.send({
                            "code": 200,
                            "success": "User registered successfully"
                        });
                    }
                });
            }
        }
    });
};

exports.login = function(req, res) {
    var email = req.body.email;
    var password = req.body.password;
    connection.query('SELECT * FROM users WHERE email = ? OR username = ?', [email, email], function(error, results, fields) {
        if (error) {
            console.log("Error while getting login data from DB: ", error);
            res.send({
                "code": 400,
                "failed": "Login failed."
            });
        } else {
            if (results.length > 0) {
                var dbHash = results[0].password_hash;
                if (bcrypt.compareSync(password, dbHash)) {
                    res.send({
                        "code": 200,
                        "success": "Login successful"
                    });
                } else {
                    res.send({
                        "code": 204,
                        "success": "Email and password does not match"
                    });
                }
            } else {
                res.send({
                    "code": 204,
                    "success": "Email does not exist"
                });
            }
        }
    });
};
