'use strict';

const express = require('express');
const router = express.Router();
const db  = require('../db/models/users');
const bcrypt = require('bcrypt');
const basicAuth = require('../middleware/auth/basicAuth');


router.post('/signup', signupFunc);
router.post('/signin', basicAuth(Users), signinFunc);

// signup Function
async function signupFunc(request, response) {
    try {
        request.body.password = await bcrypt.hash(request.body.password, 5);
        const record = await db.Users.create(request.body);
        response.status(201).json(record);
    } catch (error) {
        response.status(403).send("Error occurred");
    }
}

function signinFunc(request, response) {
    response.status(200).json(request.db.Users);
}

module.exports = router;


