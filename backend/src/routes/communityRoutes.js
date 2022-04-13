"use strict";
const express = require("express");
const database = require("../db/models/index");
const router = express.Router();
const aclAuth =require('../middleware/auth/aclAuth');
const bearerAuth =require('../middleware/auth/bearerAuth');


router.get("/community/:id",bearerAuth, aclAuth('read') ,getCommunity);
router.post("/community",bearerAuth, aclAuth('create') , createCommunity);

async function createCommunity(req, res) {
  let body = req.body;
  let user = await database.users.findByPk(body.user_id);
  console.log(user);
  if (user) {
    let createdData = await database.communities.create(req.body);
    console.log(createdData);
    if (createdData) {
      let community =await database.communities.findOne({ where: { id: createdData.id }, include: [database.users, database.posts] });
      console.log(community);
      res.status(200).json(community);
    } else {
      res.status(500).send(`the   community can not created`);
    }
  } else {
    res.status(500).send(`To do that you should register`);
  }

}

async function getCommunity(req, res) {
  let id = req.params.id;
  let allData = await database.communities.findOne({ where: { id: id }, include: [database.users, database.posts] });
  if (allData) {
    res.status(200).json(allData);
  } else {
    res.status(500).send(`the   community_id ${cid} isn\'t exist`);
  }


}

module.exports = router;
