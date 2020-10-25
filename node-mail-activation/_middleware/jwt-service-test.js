const jwt = require('jsonwebtoken');

function createJWTToken() {
    const token = jwt.sign({ sub: 'silverscreen86@gmail.com' }, 'SECRET KEY TO VALIDATE THE USER ACTIVATION LINK', { algorithm: 'HS256', expiresIn: '7d' });
    console.log('Test token' + token);
    return token;
}

function decodeJWTToken() {
    const decode = jwt.decode(createJWTToken(), 'SECRET KEY TO VALIDATE THE USER ACTIVATION LINK');
    console.log('Decoded ' + JSON.stringify(decode));
}

// createJWTToken();
decodeJWTToken();