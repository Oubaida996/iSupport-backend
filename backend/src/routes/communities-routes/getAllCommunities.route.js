"use strict";
const express = require("express");
const database = require("../../db/models/index");
const router = express.Router();
const aclAuth = require("../../middleware/auth/aclAuth");
const bearerAuth = require("../../middleware/auth/bearerAuth");

router.get("/communities", bearerAuth, aclAuth("read"), getAllCommunities);

async function getAllCommunities(req, res) {
  let allData = await database.communities.findAll({
    include: [database.users, database.posts],
  });
  let result = allData.map((ele) => {
    let output = {
      community_id: ele.community_id,
      community_name: ele.community_name,
      aboutTheCommunity: ele.community_desc,
      createdAt: ele.createdAt,
    };
    return output;
  });
  if (allData) {
    res.status(200).json(result);
  } else {
    res.status(500).json(`the   community_id ${cid} isn\'t exist`);
  }
}

module.exports = router;
