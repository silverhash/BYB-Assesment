const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const jwtsign = require('jsonwebtoken');
const config = require('config.json');

module.exports = {
    create,
    activateUserAccount
};

// create user and send confirmation hash
async function create(params) {
    // validate
    if (await db.User.findOne({ where: { email: params.email } })) {
        throw 'Email "' + params.email + '" already exists';
    }

    // hash password
    if (params.password) {
        params.hash = await bcrypt.hash(params.password, 10);
    }

    // save user
    return await db.User.create(params);
}

async function activateUserAccount(params) {
    console.log("Inside Activate User Account " + JSON.stringify(params));
    console.log("Config secret " + config.secret);
    const decoded = jwtsign.verify(params.code, config.secret);
    console.log(JSON.stringify(decoded));
    const user = await getUserByEmail(decoded.sub);
    user.active = true;
    console.log('Activated User ' + JSON.stringify(user));
    user.save();
}

async function getUserByEmail(email) {
    const user = await db.User.findOne({ where: { email: email } });
    if (!user) throw 'User not found';
    return user;
}