const express = require('express');
const router = express.Router();
const LoadBalancer = require('../service/LoadBalancer');
const config = require('config.json');
const needle = require('needle');
console.log('in mail controller');

router.get('/status/check', (req, res, next) => {
    console.log('Status check working');
    return res.json({ "message": "Status check successfull" })
});
router.post('/sendMail', loadBalanceEmails);

module.exports = router;

const options = {
    state: "CLOSED",
    failureCount: 0,
    successCount: 0,
    nextAttempt: Date.now(),
    fallback: sendMailsfromMailgun
};

function sendMailsfromSendGrid(request) {
    console.log('Load balance send grid emails' + request.body.email);
    return needle('post', config.SG_MAIL_URI, { email: request.body.email, fullName: request.body.fullName }, { json: true });
}


function sendMailsfromMailgun(request) {
    console.log('Load balance mailgun emails');
    return needle('post', config.MG_MAIL_URI, { email: request.body.email, fullName: request.body.fullName }, { json: true });
}


const balancer = new LoadBalancer(sendMailsfromSendGrid, options);
function loadBalanceEmails(req, res, next) {
    console.log('Load balance mail service' + req.body.email + req.body.fullName);
    balancer
        .fire(req)
        .then(console.log)
        .catch(console.error)
}