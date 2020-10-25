const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const userService = require('./user.service');

// routes
router.get('/status/check', () => {
    console.log('Status check working');
});
router.post('/register', registerSchema, register);
router.get('/activation/:code/:fullName', activateUserAccount);

module.exports = router;

function registerSchema(req, res, next) {
    const schema = Joi.object({
        fullName: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().min(6).required()
    });
    validateRequest(req, next, schema);
}

function register(req, res, next) {
    userService.create(req.body)
        .then((data) => {
            console.log('Registration successful');
            return res.json(data);
        })
        .catch(next);
}

function activateUserAccount(req, res, next) {
    console.log("User Controller active user account");
    userService.activateUserAccount(req.params)
        .then((user) => {
            res.json({ message: 'Activation successfull' });
            // res.json(user)
        })
        .catch(next);
}