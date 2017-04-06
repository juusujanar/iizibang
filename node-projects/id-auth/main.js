/*
    Original source by user andris9 at GitHub: https://gist.github.com/andris9/1132553
*/
var https = require('https'),
    fs = require('fs'),
    utillib = require('util');

var options = {
    key: fs.readFileSync('certs/iizibang.jjdev.eu.key'),
    cert: fs.readFileSync('certs/iizibang.jjdev.eu.pem'),
    ca: [
        fs.readFileSync('certs/EE_Certification_Centre_Root_CA.pem.crt'),
        fs.readFileSync('certs/EID-SK_2016.pem.crt'),
        fs.readFileSync('certs/ESTEID-SK_2015.pem.crt')
    ],
    requestCert: true,
    rejectUnauthorized: true
};

https.createServer(options, function (req, res) {
    res.setHeader("Content-type","text/plain; charset=utf-8");
    res.writeHead(200);
    res.end(utillib.inspect(req.connection.getPeerCertificate()));
}).listen(453);
