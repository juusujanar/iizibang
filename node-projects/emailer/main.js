'use strict';
const nodemailer = require('nodemailer');

/*let poolConfig = {
    pool: true,
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use TLS
    auth: {
        user: 'user@gmail.com',
        pass: 'pass'
    }
};*/

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'janar.juusu@gmail.com',
        pass: 'homyfwutkmcukrhd'
    }
});

// setup email data with unicode symbols
let message = {
    from: '"iiZiBang" <no-reply@iizibang.jjdev.eu>', // sender address
    sender: '"iiZiBang" <no-reply@iizibang.jjdev.eu>', // sender address
    to: 'Cardo Kambla, kamblaca@gmail.com', // list of receivers
    subject: 'Hello from iiZiBang team', // Subject line
    html: 'Hey, you there! We are glad to welcome you to the iiZiBang community. Feel free to start testing our services and do not hesitate to ask any questions.' // html body
};

// send mail with defined transport object
transporter.sendMail(message, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Message %s sent: %s', info.messageId, info.response);
});
