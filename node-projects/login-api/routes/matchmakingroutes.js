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
].join("");

findMatchInDatabase = function(req) {
    connection.query(MATCHFIND_SQL, [req.session.userdata.id], function(error, results, fields) {
        if (error) {
            console.log(error);
            return null;
        }
        return results[0];
    });
} 

exports.findmatch = function(req, res) {
    console.log(req.session);
    if (!req.session.match) {
        req.session.match = findMatchInDatabase(req);
    }
    console.log(req.session.match);
    res.send(req.session.match);
    return;
};