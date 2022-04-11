'use strict';
const express = require('express');
const {test} = require('../model/index');
const router = express.Router();

router.get("/trending", getTrending);
router.get("/trending", createTrending);

function createTrending(req,res){
// let createdData = await test.create(req.body);
    // res.status(201).send(createdData);
}

function getTrending(req,res){
    // let allData = await test.findOne({ where: { id: id } });
    // res.status(200).send(allData);
}



module.exports = router;