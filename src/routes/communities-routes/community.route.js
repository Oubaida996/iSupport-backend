"use strict";
const express = require("express");
const database = require("../../db/models/index");
const router = express.Router();
const aclAuth = require("../../middleware/auth/aclAuth");
const bearerAuth = require("../../middleware/auth/bearerAuth");

router.get("/community/:id", bearerAuth, aclAuth("read"), getCommunity);
router.post("/community", bearerAuth, aclAuth("create"), createCommunity);
router.delete("/community/:id", bearerAuth, aclAuth("delete"), deleteCommunity);

async function createCommunity(req, res) {
  let user = await database.users.findByPk(req.user.id); // ??
  if (user) {
    let createdData = await database.communities.create(req.body);
    if (createdData) {
      let community = await database.communities.findOne({
        where: { community_id: createdData.community_id },
        include: [database.users, database.posts],
      });
      await database.users_communities.create({
        user_id: req.user.id,
        community_id: createdData.community_id,
      });
      let modName = await database.users.findOne({
        where: { id: req.user.id },
      });
      await database.moderators.create({
        mod_name: modName.dataValues.username,
        user_id: req.user.id,
        community_id: community.dataValues.community_id,
      });

      res.status(200).json(community);
    } else {
      res.status(500).send(`the community can not be created`);
    }
  } else {
    res.status(500).send(`To do that you should register`);
  }
}

async function getCommunity(req, res) {
  let cid = req.params.id;
  let fetchCommunity = await database.communities.findOne({
    where: { community_id: cid },
    include: [database.users, database.posts],
  });
  if (fetchCommunity) {
    res.status(200).json(fetchCommunity);
  } else {
    res.status(500).json(`the community doesn't exist`);
  }
}

async function deleteCommunity(req, res) {
  let cid = req.params.id;
  let fetchCommunity = await database.communities.findOne({
    where: { community_id: cid },
  });
  if (fetchCommunity) {
    try {
      await database.communities.destroy({ where: { community_id: cid } });
      res.status(201).json({
        fetchCommunity: fetchCommunity,
        message: "deleted successfully",
      });
    } catch (error) {
      console.log(error);
    }

  } else {
    res.status(500).json(`the community doesn't exist`);
  }
}

module.exports = router;
