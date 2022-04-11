'use strict';
const express = require('express');
const database = require('../src/db/models/index');
const router = express.Router();

router.get("/communites", getAlCommunites);

async function getAlCommunites(req,res){
    let allData = await database.communities.findAll();
    res.status(200).send(allData);
    // res.send('test comminites');
}

module.exports = router;