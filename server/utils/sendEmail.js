const nodemailer = require('nodemailer');
const config = require('../config/keys');

let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // TLS
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    },
    tls: {
        rejectUnauthorized: false
    }
});

const sendEmail = (email, subject, html) => {
    transporter.sendMail({
        from: process.env.EMAIL,
        to: email,
        subject,
        html,
    }, (error, info) => {
        if (error) {
            console.error('Email sending error:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    })
}

module.exports = sendEmail;