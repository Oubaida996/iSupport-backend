"use strict";
const express = require("express");
const database = require("../db/models/index");
const router = express.Router();
const aclAuth = require('../middleware/auth/aclAuth');
const bearerAuth = require('../middleware/auth/bearerAuth');



router.get("/community/:id", bearerAuth, aclAuth('read'), getCommunity);
router.post("/community", bearerAuth, aclAuth('create'), createCommunity);
router.delete("/community/:id", bearerAuth, aclAuth('delete'), deleteCommunity);

async function createCommunity(req, res) {
  let body = req.body;
  let user = await database.users.findByPk(req.user.id);
  // console.log('create community', user.communities);
  if (user) {
    let createdData = await database.communities.create(req.body);
    // console.log(createdData);
    if (createdData) {

      let community = await database.communities.findOne({ where: { id: createdData.id }, include: [database.users, database.posts] });
      res.status(200).json(community);
    } else {
      res.status(500).send(`the   community can not created`);
    }
  } else {
    res.status(500).send(`To do that you should register`);
  }
}

async function getCommunity(req, res) {

  let cid = req.params.id;
  let fetchCommunity = await database.communities.findOne({ where: { id: cid }, include: [database.users, database.posts] });
  if (fetchCommunity) {
    res.status(200).json(fetchCommunity);
  } else {
    res.status(500).json(`the   community_id ${cid} isn\'t exist`);
  }
}


async function deleteCommunity(req, res) {
  let cid = req.params.id;
  let fetchCommunity = await database.communities.findOne({ where: { id: cid }, include: [database.users, database, posts] });
  if (fetchCommunity) {
    await database.communities.destroy({ where: { id: cid } });
    res.status(201).json({ fetchCommunity: fetchCommunity, message: 'deleted successfully' });
  } else {
    res.status(500).json(`The community id ${cid} isn't exist`);
  }
}

module.exports = router;
