"use strict";
const express = require("express");
const database = require("../db/models/index");
const router = express.Router();

router.get("/communities", getAlCommunities);


async function getAlCommunities(req, res) {
  let allData = await database.communities.findAll({include :[database.users ,database.posts]});
  res.status(200).send(allData);
  
}

module.exports = router;
