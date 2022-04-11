const express = require('express');
const router = express.Router();
const db = require('../db/models/users');
userConroll = require('../controllers/user.controll')

router.get('/',userConroll.allUsers)

module.exports = router;

