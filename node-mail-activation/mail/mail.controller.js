const express = require('express');
const router = express.Router();
const Joi = require('joi');
const emailService = require('./mail.service');
const jwtutil = require('_helpers/jwtutil');
const config = require('config.json');
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(config.sgApiKey);
router.post('/sendMail', sendActivationEmail);

module.exports = router;


function sendActivationEmail(req, res, next) {
    console.log('Send Email -> ' + req.body.email + ' Full Name ' + req.body.fullName);
    const link = 'http://' + config.host + ':4000/users/activation/' + jwtutil.createJWTToken(req.body.email) + "/" + req.body.fullName;
    console.log('Activation link ' + link);
    const msg = {
        to: req.body.email, // Change to your recipient
        from: 'cloudakiraa@gmail.com', // Change to your verified sender
        subject: 'Activation email for ' + req.body.fullName,
        text: link,
        html: "<a href='" + link + "'>Activate Email</a>",
    };
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