'use strict';

const express = require('express');
const router = express.Router();
const { User } = require('../model/index.js');
const bcrypt = require('bcrypt');
const basicAuth = require('./auth/middleware/basic');
// const bearerAuth = require('./auth/middleware/bearer');

router.post('/signup', signupFunc);
router.post('/signin', basicAuth(User), signinFunc);

// signup Function
async function signupFunc(request, response) {
    try {
        request.body.password = await bcrypt.hash(request.body.password, 5);
        const record = await User.create(request.body);
        response.status(201).json(record);
    } catch (error) {
        response.status(403).send("Error occurred");
    }
}

function signinFunc(request, response) {
    response.status(200).json(request.user);
}

module.exports = router;


