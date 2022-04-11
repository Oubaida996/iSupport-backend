const express = require('express');
const { where } = require('sequelize/types');
const Posts = require('../model/posts')
const router = express.Router()

// Posts Route

router.get("/Posts", getPostsHandler);
router.get("/Posts/:id", getSinglePostsHandler);
router.put("/Posts/:id", updatePostInfoHandler);
router.delete("/Posts/:id", deletePostHandler);
router.get("/Posts/:author", getPostsFromUserHandler);

// Controllers

//Get All Posts
async function getPostsHandler(req, res) {
  let fetchedPost = await Posts.findAll();
  res.status(200).json(fetchedPost);
}
//Get single Posts
async function getSinglePostsHandler(req, res) {
  let pid = parseInt(req.params.id);
  let fetchedPost = await Posts.findOne({ where: { id: pid } });
  res.json(fetchedPost);
}
//Update single Posts
async function updatePostInfoHandler(req, res) {
  let pid = req.params.id;
  let toUpdate = await Posts.findOne({ where: { id: pid } });
  let updatedPost = await toUpdate.update(req.body);
  res.status(201).json(updatedPost);
}
//Delete single Posts
async function deletePostHandler(req, res) {
  let pid = parseInt(req.params.id);
  let fetchedPost = await Posts.destroy({ where: { id: pid } });
  res.status(201).json(fetchedPost);
}


//Get All Posts from a single user
async function getPostsFromUserHandler(req, res) {
  let uid = parseInt(req.params.author)
  let fetchedPost = await Post.findAll({ where: { author: uid }});
  res.status(200).json(fetchedPost);
}


//Get All Posts from a single community
async function getPostsFromUserHandler(req, res) {
  let cid = parseInt(req.params.community_id)
  let fetchedPost = await Post.findAll({ where: { community_id: cid }});
  res.status(200).json(fetchedPost);
}

module.exports = router