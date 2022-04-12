'use strict';

const express = require("express");
const database = require("../db/models/index");
const router = express.Router();

router.get("/search", searchcommunity);

async function searchcommunity(req, res) {
    let nameCommunity = req.query.community_name;
      let getCommunity = await database.communities.findAll({
        where: {
            community_name: nameCommunity
        }
      });
      res.status(201).send(getCommunity);
}

module.exports = router;