"use strict";

const express = require("express");
const database = require("../../db/models/index"); //just fix the path
const router = express.Router();
const bcrypt = require("bcrypt");
// Users Route
router.get("/users", getUsersHandler);
router.get("/user/:id", getSingleUsersHandler);
router.put("/user/:id", updateUserInfoHandler);
router.delete("/user/:id", deleteUserHandler);

// Controllers

//Get All Users

//Get All Users
async function getUsersHandler(req, res) {
  const usersRaw = await database.users.findAll({
    include: [database.communities],
  });
  let users = usersRaw.map((ele) => {
    let output = {
      user_id: ele.id,
      username: ele.username,
      firstname: ele.firstName,
      lastname: ele.lastName,
      email: ele.email,
      joidAt: ele.createdAt,
    };
    return output;
  });

  res.status(200).json(users);
}

//Get single Users
async function getSingleUsersHandler(req, res) {
  let userId = parseInt(req.params.id);
  let user = await database.users.findOne({
    where: { id: userId },
    include: [database.communities, database.posts],
  });
  if (user) {
    res.status(200).json({
      user_id: user.id,
      username: user.username,
      firstname: user.firstName,
      lastname: user.lastName,
      email: user.email,
      joidAt: user.createdAt,
    });
  } else {
    res.status(500).send(`the user doesn't exist`);
  }
}

//Update single Users
async function updateUserInfoHandler(req, res) {
  const userId = req.params.id;
  const toUpdate = await database.users.findOne({ where: { id: userId } });
  if (toUpdate) {
    let updatedUser = await toUpdate.update(req.body);
    res.status(201).json({
      user_id: updatedUser.id,
      username: updatedUser.username,
      firstname: updatedUser.firstName,
      lastname: updatedUser.lastName,
      email: updatedUser.email,
      joidAt: updatedUser.createdAt,
    });
  } else {
    res.status(500).send(`the user doesn't exist`);
  }
}

//Delete single Users
async function deleteUserHandler(req, res) {
  const userId = parseInt(req.params.id);
  const fetchedUser = await database.users.findOne({
    where: { id: userId },
  });
  await database.users.destroy({ where: { id: userId } });
  res
    .status(201)
    .send(`the user: ${fetchedUser.username} is deleted successfully `);
}

module.exports = router;
