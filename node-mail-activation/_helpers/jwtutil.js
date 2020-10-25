const jwtsign = require('jsonwebtoken');
const config = require('config.json');

function createJWTToken(params) {
    console.log('Email id ' + params);
    // authentication successful
    const token = jwtsign.sign({ sub: params }, config.secret, { algorithm: 'HS256', expiresIn: '7d' });
    return token;
}

module.exports = {
    createJWTToken
}