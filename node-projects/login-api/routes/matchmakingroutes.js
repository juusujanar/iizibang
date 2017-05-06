var mysql = require('mysql');
var connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

var MATCHFIND_SQL = [
"SELECT *"
, "FROM users"
, "WHERE users.id != ? AND NOT EXISTS (SELECT * FROM match_choice WHERE player1 = ? AND player2 = users.id)"
, "ORDER BY RAND()"
, "LIMIT 1"
].join(" ");

findMatchInDatabase = function(req) {
    connection.query(MATCHFIND_SQL, [req.session.userdata.id, req.session.userdata.id], function(error, results, fields) {
        if (error) {
            console.log(error);
            return null;
        }
        console.log(results);
        req.session.match = results[0];
    });
} 

exports.findmatch = function(req, res) {
    req.session.match = null; // remove to stop refresh changing match
    if (!req.session.match) {
        connection.query(MATCHFIND_SQL, [req.session.userdata.id, req.session.userdata.id], function(error, results, fields) {
            if (error) {
                console.log(error);
                res.send(null);
            }
            req.session.match = results[0];
            res.send(req.session.match);
        });
    } else {
        res.send(req.session.match);
        return; 
    }
};

var INSERT_MATCH_DECISION_SQL = "INSERT INTO match_choice (player1, player2, player1_agreed) VALUES (?, ?, ?)";
var MATCH_CHOICE_QUERY = "SELECT player1_agreed FROM match_choice WHERE player1 = ? AND player2 = ?";
var INSERT_SUCCESSFUL_MATCH = "INSERT INTO successful_matches (player1, player2, timestamp) VALUES (?, ?, NOW() )";

exports.acceptmatch = function(req, res) {
    connection.query(INSERT_MATCH_DECISION_SQL, [req.session.userdata.id, req.session.match.id, true], function(error, results, fields) {
        if (error) {
            console.log(error);
            res.send(null);
        }
        connection.query(MATCH_CHOICE_QUERY, [req.session.match.id, req.session.userdata.id], function(error, results, fields) {
            if (error) {
                console.log(error);
                res.send(null);
            }
            console.log(results);
            if (results[0] != null)
                console.log(results[0].player1_agreed);
            if (results[0] != null && results[0].player1_agreed) {
                connection.query(INSERT_SUCCESSFUL_MATCH, [req.session.userdata.id, req.session.match.id], function(error, results, fields) {
                    if (error) {
                        console.log(error);
                        res.send(null);
                    }
                    res.send("Successfully matched with " + req.session.match.username);
                });
            } else {
                res.send("You like "  + req.session.match.username);
            }
        });        
    });
};

exports.rejectmatch = function(req, res) {
    connection.query(INSERT_MATCH_DECISION_SQL, [req.session.userdata.id, req.session.match.id, false], function(error, results, fields) {
        if (error) {
            console.log(error);
            res.send(null);
        }
        res.send("You don't like "  + req.session.match.username); 
    });
};