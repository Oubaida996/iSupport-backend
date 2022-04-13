"use strict";

const express = require("express");
const router = express.Router();

const database = require('../db/models/index');

const bcrypt = require('bcrypt');
const basicAuth = require('../middleware/auth/basicAuth');
const UserControll = require('../controllers/userControll');
// const check = require('check');


// Routes:
// signin,signup
router.post('/signup', signupFunc);
router.post('/signin', basicAuth, signinFunc);
//logout
router.get('/user/logout/:id',UserControll.userLogout);

// delete user
router.delete('/user/:id',UserControll.DeleteUser);

// update user data
router.put('/user/update/:id',UserControll.updateUser);

// change  passworde
// router.post('/:id/change',[check('password').matches(/^(?=.*\d)(?=.*[a-zA-Z]).{8,}$/).withMessage('must contain at least 8 char character')],UserControll.changePassword);

// function:
// signup Function
async function signupFunc(req, res) {
    try {
        req.body.password = await bcrypt.hash(req.body.password, 5);
        const record = await database.users.create(req.body);
        res.status(201).json(record);
    } catch (error) {
        res.status(403).send("Error occurred");
    }
}

// signin Function
function signinFunc(req, res) {
    
    res.status(200).json(req.user);
}

module.exports = router;
