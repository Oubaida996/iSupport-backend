'use strict';

const database = require("../db/models/index");
const { Op } = require("sequelize");
const Posts = require("../db/models/posts");
const router = express.Router();
