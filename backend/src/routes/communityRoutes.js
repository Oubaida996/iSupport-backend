"use strict";
const express = require("express");
const database = require("../db/models/index");
const router = express.Router();

router.get("/community/:id", getCommunity);
// router.post("/community", createCommunity);

// async function createCommunity(req,res){
//     let createdData = await database.communities.create(req.body);
//     res.status(201).send(createdData);;
//     // res.send('test');
// }

async function getCommunity(req, res) {
  let id = req.params.id;
  let allData = await database.communities.findOne({ where: { id: id } });
  res.status(200).send(allData);
  res.send("test");
}

module.exports = router;
