"use strict";

const express = require("express");
const database = require("../../db/models/index");
const router = express.Router();

router.get("/search", searchcommunity);

async function searchcommunity(req, res) {
  let nameCommunity = req.query.community_name;
  if (nameCommunity) {
    let getCommunity = await database.communities.findAll({
      where: {
        community_name: nameCommunity,
      },
    });
    if (getCommunity.length) {
      res.status(201).json(getCommunity);
    } else {
      res.status(201).json(`The Community doesn't exist`);
    }
  } else {
    res
      .status(500)
      .json(
        `you should insert the query as ' /search/?community_name=nameofcommunity '`
      );
  }
}

module.exports = router;
