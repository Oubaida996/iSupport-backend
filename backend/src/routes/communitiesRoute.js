"use strict";
const express = require("express");
const database = require("../db/models/index");
const router = express.Router();
const aclAuth =require('../middleware/auth/aclAuth');
const bearerAuth =require('../middleware/auth/bearerAuth');

router.get("/communities",bearerAuth, aclAuth('edit all') ,getAlCommunities);


async function getAlCommunities(req, res) {
  let allData = await database.communities.findAll({include :[database.users ,database.posts]});
  res.status(200).send(allData);
  
}

module.exports = router;
