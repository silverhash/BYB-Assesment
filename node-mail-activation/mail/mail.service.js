const sgMail = require('@sendgrid/mail')
const config = require('config.json');
sgMail.setApiKey(config.sgApiKey);

module.exports = {
    sendEmail
}

async function sendEmail(msg) {
    console.log('In mail service ');
    return await sgMail.send(msg);
    // .then(() => {
    //     console.log('Email sent')
    // })
    // .catch((error) => {
    //     console.error(error)
    // });
}