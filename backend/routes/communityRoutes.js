'use strict';
const express = require('express');
const {test} = require('../model/index');
const router = express.Router();

router.get("/community", getCommunity);

function getCommunity(req,res){
    // let allData = await test.findOne({ where: { id: id } });
    // res.status(200).send(allData);
}


module.exports = router;