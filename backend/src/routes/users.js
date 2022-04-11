const express = require('express')
const users = require('../model/users')
const router = express.Router()

// Users Route

router.get("/users", getUsersHandler);
router.get("/users/:id", getSingleUsersHandler);
router.put("/users/:id", updateUserInfoHandler);
router.delete("/users/:id", deleteUserHandler);

// Controllers

//Get All Users
async function getUsersHandler(req, res) {
  let usrs = await users.findAll();
  res.status(200).json(usrs);
}
//Get single Users
async function getSingleUsersHandler(req, res) {
  let uid = parseInt(req.params.id);
  let user = await users.findOne({ where: { id: uid } });
  res.json(user);
}
//Update single Users
async function updateUserInfoHandler(req, res) {
  let uid = req.params.id;
  let toUpdate = await users.findOne({ where: { id: uid } });
  let updatedUser = await toUpdate.update(req.body);
  res.status(201).json(updatedUser);
}
//Delete single Users
async function deleteUserHandler(req, res) {
  let uid = parseInt(req.params.id);
  let user = await users.destroy({ where: { id: uid } });
  res.status(201).json(user);
}

module.exports = router