const express = require('express');
const router = express.Router();
const emailService = require('./mail.service');
const jwtutil = require('_helpers/jwtutil');
const config = require('config.json');
router.post('/sendMail', sendActivationEmail);
router.post('/sendFallbackMail', sendFallbackActivationMail)

module.exports = router;


function sendActivationEmail(req, res, next) {
    console.log('Send Activation Email -> ' + req.body.email + ' Full Name ' + req.body.fullName);
    const msg = createMsg(req);
    console.log('Send Email');
    emailService.sendEmail(msg)
        .then(() => {
            console.log('Email Sent to ' + msg.to);
            res.json({ "message ": "Activation Successfull" });
        })
        .catch((error) => {
            console.log('error while sending email ' + error);
            throw error;
        });

}

function sendFallbackActivationMail(req, res, next) {
    console.log('Send Fallback Activation Email -> ' + req.body.email + ' Full Name ' + req.body.fullName);
    const msg = createMsg(req);
    console.log('Send Email');
    emailService.sendFallbackEmail(msg)
        .then(() => {
            console.log('Email Sent to ' + msg.to);
            res.json({ "message ": "Activation Successfull" });
        })
        .catch((error) => {
            console.log('error while sending email ' + error);
            throw error;
        });

}

function createMsg(req) {
    const link = 'http://' + config.host + ':4000/users/activation/' + jwtutil.createJWTToken(req.body.email) + "/" + req.body.fullName;
    console.log('Activation link ' + link);
    const msg = {
        to: req.body.email, // Change to your recipient
        from: config.from, // Change to your verified sender
        subject: 'Activation email for ' + req.body.fullName,
        text: link,
        html: "<a href='" + link + "'>Activate Email</a>",
    };
    return msg;
} 