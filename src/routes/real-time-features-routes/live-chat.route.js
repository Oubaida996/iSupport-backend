const express = require("express");
const router = express.Router();
const database = require("../../db/models/index");

// Live Chat App
router.get("/community/:id/live-chat", liveChatHandler);

async function liveChatHandler(req, res) {
  let id = parseInt(req.params.id);
  const dbQuery = await database.communities.findAll({
    where: { community_id: id },
  });
  let communityName = dbQuery[0].dataValues.community_name;
  res.render("index", { community_id: id, communityName });
}

module.exports = router;
