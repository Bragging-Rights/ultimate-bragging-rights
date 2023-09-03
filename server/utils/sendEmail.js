const nodemailer = require('nodemailer');
const config = require('../config/keys');

let transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: false,
    port: 587,
    auth: {
        user: config.email,
        pass: config.emailPassword
    },
    tls: {
        rejectUnauthorized: false
    }
});

const sendEmail = (email, subject, html) => {
    transporter.sendMail({
        from: config.email,
        to: email,
        subject,
        html,
    })
}

module.exports = sendEmail;