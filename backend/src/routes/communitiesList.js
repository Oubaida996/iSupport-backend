const express = require("express");
const database = require("../db/models/index");
const router = express.Router();

// Logged in user home routes
router.get("/user/:id/communities-list", getUserCommunitiesList);

//Get User Communities List
async function getUserCommunitiesList(req, res) {
  let id = parseInt(req.params.id);
  let fetchedUserCommunities = await database.users.findAll({
    where: { user_id: id },
    include: [database.posts],
  });
  res.status(200).json(fetchedUserCommunities);
}

module.exports = router;
