const express = require("express");
const database = require("../db/models/index");
const router = express.Router();

// Logged in user home routes
router.get("/communities/:id/users", getUserCommunitiesList);

//Get User Communities List
async function getUserCommunitiesList(req, res) {
  let cid = parseInt(req.params.id);
  let fetchedUserCommunities = await database.communities.findOne({
    where: { id: cid },
    include: [database.users],
  });
  if (fetchedUserCommunities) {
    res.status(200).json(fetchedUserCommunities);
  } else {
    res.status(500).json(`the   community_id ${cid} isn\'t exist`);
  }

}

module.exports = router;
