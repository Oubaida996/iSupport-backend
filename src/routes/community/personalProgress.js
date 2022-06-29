"use strict";
const express = require("express");
const database = require("../../db/models/index");
const bearerAuth = require("../../middleware/auth/bearerAuth");
const router = express.Router();

//Get User Personal List by community ID
router.get("/community/:id/personalProgress", bearerAuth, getpersonalProgress);


async function getpersonalProgress(req, res) {
  try {
    let id = parseInt(req.params.id);
    let userid = req.user.dataValues.id;
    const personalProgress = await database.posts.findAll({
      where: { community_id: id, author: userid },
    });
    let tasksHistory = personalProgress.map((ele) => {
      let output = {
        post_id: ele.dataValues.id,
        post_title: ele.dataValues.post_title,
        post_body: ele.dataValues.post_body,
      };
      return output;
    });
    res
      .status(200)
      .json({ numberOfTasks: personalProgress.length, history: tasksHistory });
  } catch (error) {
    res.status(500).json(error);
  }

}

module.exports = router;
