'use strict';
const express = require('express');
const {test} = require('../model/index');
const router = express.Router();

router.get("/communites", getAlCommunites);

function getAlCommunites(req,res){
    // let allData = await test.findAll();;
    // res.status(200).send(allData);
}



module.exports = router;