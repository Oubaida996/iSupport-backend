"use strict";
const express = require("express");
const database = require("../../db/models/index");
const router = express.Router();

router.get("/trending", trendingCommunity);

async function trendingCommunity(req, res) {
  let results = await database.posts.findAll({
    attributes: ["community_id"],
    group: "community_id",
    order: [database.sequelize.fn("COUNT", database.sequelize.col("posts"))],
    limit: 5,
  });
  console.log(results);
  res.status(201).json(results);
}

module.exports = router;
