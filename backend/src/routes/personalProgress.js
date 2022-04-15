'use strict';
const express = require("express");
const database = require("../db/models/index");
const bearerAuth = require("../middleware/auth/bearerAuth");
const router = express.Router();

// Logged in user home routes
router.get("/community/:id/personalProgress",bearerAuth, getpersonalProgress);

//Get User Communities List
async function getpersonalProgress(req, res) {
  let id = parseInt(req.params.id);
  // const [leaderBoardResults, metadata] = await database.sequelize.query(
  //   `SELECT  author FROM posts GROUP BY community_id ORDER BY COUNT(posts.author);`
  // );
  let userid = req.username;
  const personalProgress = await database.posts.findAll({
    attributes: ["posts"],
    group: "community_id",
    order: [database.sequelize.fn("COUNT", database.sequelize.col("author"))],
    where: { community_id: id ,author:userid},
  });
  console.log(personalProgress);
  res.status(200).json(personalProgress);
}

module.exports = router;
