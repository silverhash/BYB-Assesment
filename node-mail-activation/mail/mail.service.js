const sgMail = require('@sendgrid/mail')
sgMail.setApiKey('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');

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