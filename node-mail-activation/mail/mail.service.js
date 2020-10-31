// SG config
const sgMail = require('@sendgrid/mail')
const config = require('config.json');
sgMail.setApiKey(config.sgApiKey);


// MG config
const API_KEY = config.mgApiKey;
const DOMAIN = config.mgDomain;
const mailgun = require('mailgun-js')({ apiKey: API_KEY, domain: DOMAIN });

// SendGrid is primary for sending emails
async function sendEmail(msg) {
    console.log('In mail service ');
    return await sgMail.send(msg);
}

// MailGun api is used as fallback 
async function sendFallbackEmail(msg) {
    console.log('In Fallback mail service');
    return await mailgun.messages().send(msg, (error, body) => {
        console.log(body);
    });
}

module.exports = {
    sendEmail,
    sendFallbackEmail
}
