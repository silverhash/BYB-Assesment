
const sgMail = require('@sendgrid/mail')
// const config = require('config.json');
sgMail.setApiKey('');

const msg = {
    to: '', // Change to your recipient
    from: '', // Change to your verified sender
    subject: 'Activation email for ' + 'TestUser',
    text: 'http://localhost:4000/activation/' + 'JhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJUZXN0VXNlciIsImlhdCI6MTYwMzU3MDAzNCwiZXhwIjoxNjA0MTc0ODM0fQ.VCs-_-MPmU_wolOUZzPkGmdJVcwx4Lv0YTTj0FAupUs' + '/TestUser',
    html: "<a href='" + 'http://localhost:4000/activation/' + 'JhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJUZXN0VXNlciIsImlhdCI6MTYwMzU3MDAzNCwiZXhwIjoxNjA0MTc0ODM0fQ.VCs-_-MPmU_wolOUZzPkGmdJVcwx4Lv0YTTj0FAupUs' + '/TestUser' + "'>Activate Email</a>",
}

sgMail
    .send(msg)
    .then(() => {
        console.log('Email sent');
    })
    .catch((error) => {
        console.error(error);
    });


