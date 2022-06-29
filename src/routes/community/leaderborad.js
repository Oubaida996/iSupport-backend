const express = require("express");
const database = require("../../db/models/index");
const router = express.Router();

//Get Community Leaderboard by Community ID
router.get("/community/:id/leaderboard", getCommunityLeaderboard);

async function getCommunityLeaderboard(req, res) {
  try {
    let id = parseInt(req.params.id);
    const result = await database.posts.findAll({
      attributes: [
        "author",
        [
          database.sequelize.fn("COUNT", database.sequelize.col("author")),
          "progress",
        ],
      ],
      group: ["author", "user.id"],
      order: [database.sequelize.fn("COUNT", database.sequelize.col("author"))],
      limit: 3,
      include: [database.users],
      where: { community_id: id },
    });
    let response = result
      .map((ele) => {
        return {
          username: ele.user.username,
          progress: ele.dataValues.progress,
        };
      })
      .sort((a, b) => b.progress - a.progress);
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

module.exports = router;
