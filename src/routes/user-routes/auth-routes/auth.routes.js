"use strict";

const express = require("express");
const router = express.Router();

const database = require("../../../db/models/index");

const bcrypt = require("bcrypt");
const basicAuth = require("../../../middleware/auth/basicAuth");
const UserControll = require("../../../controllers/userControll");
// const check = require('check');
const aclAuth = require("../../../middleware/auth/aclAuth");
const bearerAuth = require("../../../middleware/auth/bearerAuth");

// signin,signup
router.post("/signup", signupFunc);
router.post("/signin", basicAuth, signinFunc);
//logout
router.get("/user/logout/:id", bearerAuth, UserControll.userLogout);

// delete user
router.delete(
  "/user/delete/:id",
  bearerAuth,
  aclAuth("read"),
  UserControll.DeleteUser
);

// update user data
router.put(
  "/user/update/:id",
  bearerAuth,
  aclAuth("read"),
  UserControll.updateUser
);

// function:
// signup Function
async function signupFunc(req, res) {
  try {
    req.body.password = await bcrypt.hash(req.body.password, 5);
    const record = await database.users.create(req.body);
    res.status(201).send(`You have successfully signed up`);
  } catch (error) {
    res.status(403).send("Error occurred");
  }
}

// signin Function
function signinFunc(req, res) {
  res.status(200).json({
    user_id: req.user.id,
    firstName: req.user.firstName,
    lastName: req.user.lastName,
    email: req.user.email,
    username: req.user.username,
    token: req.user.token,
    actions: req.user.actions
  });
}

module.exports = router;
