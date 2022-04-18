"use strict";
const express = require("express");
const database = require("../../db/models/index");
const router = express.Router();
const aclAuth = require("../../middleware/auth/aclAuth");
const bearerAuth = require("../../middleware/auth/bearerAuth");

// Posts Route
router.post(
  "/community/:id/create-post",
  bearerAuth,
  aclAuth("read"),
  createPostHandler
);
router.get(
  "/community/:id/get-posts",
  bearerAuth,
  aclAuth("read"),
  getPostsHandler
);
router.get(
  "/community/:id/search",
  bearerAuth,
  aclAuth("read"),
  getSinglePostsHandler
);
router.patch(
  "/update-post/:id",
  bearerAuth,
  aclAuth("update"),
  updatePostInfoHandler
);
router.delete(
  "/community/:id/delete-post/:postId",
  bearerAuth,
  aclAuth("read"),
  deletePostHandler
);
router.get(
  "/user/:id/get-all-posts",
  bearerAuth,
  aclAuth("read"),
  getPostsFromUserHandler
);
router.get(
  "/posts/community/:id",
  bearerAuth,
  aclAuth("read"),
  getPostsFromCommunityHandler
);
router.get(
  "/user/:id/community/:cid",
  bearerAuth,
  aclAuth("read"),
  getUserPostsFromCommunity
);

// Controllers

//Create new Post
async function createPostHandler(req, res) {
  let body = req.body;
  let communityId = req.params.id;
  let user = await database.users.findOne({
    username: req.user.dataValues.username,
  });
  if (user) {
    let createdPost = await database.posts.create({
      ...body,
      community_id: communityId,
      author: req.user.dataValues.id,
    });
    if (createdPost) {
      let post = await database.posts.findOne({
        where: { id: createdPost.id },
        include: [database.users, database.communities],
      });
      res
        .status(200)
        .json({ id: post.id, title: post.post_title, body: post.post_body });
    } else {
      res.status(500).send(`the   post can not created`);
    }
  } else {
    res.status(500).send(`To do that you should register`);
  }
}

//Get All Posts
async function getPostsHandler(req, res) {
  let communityId = req.params.id;
  let fetchedPost = await database.posts.findAll({
    where: { community_id: communityId },
  });
  let result = fetchedPost.map((ele) => {
    let output = {
      id: ele.id,
      title: ele.post_title,
      body: ele.post_body,
      author: ele.author,
      createdAt: ele.createdAt,
    };
    return output;
  });

  res.status(200).json(result);
}
//Get single Posts
async function getSinglePostsHandler(req, res) {
  const searchParameter = req.query.post;
  console.log(searchParameter);
  const communityId = req.params.id;
  const fetchedPosts = await database.posts.findAll({
    where: {
      post_body: {
        [database.Sequelize.Op.like]: `${searchParameter}%`,
      },
      community_id: communityId,
    },
  });
  let output = fetchedPosts.map((ele) => {
    let output = {
      id: ele.id,
      title: ele.post_title,
      body: ele.post_body,
      author: ele.author,
      createdAt: ele.createdAt,
    };
    return output;
  });
  if (fetchedPosts) {
    res.status(200).json(output);
  } else {
    res.status(500).send(`the  post id ${pid} isn\'t exist`);
  }
}
//Update single Posts
async function updatePostInfoHandler(req, res) {
  const pid = req.params.id;
  const updateValues = { ...req.body };
  let toUpdate = await database.posts.findOne({ where: { id: pid } });

  if (toUpdate) {
    if (updateValues.post_title) {
      toUpdate.post_title = updateValues.post_title;
      await toUpdate.save();
    } else if (updateValues.post_body) {
      toUpdate.post_body = updateValues.post_body;
      await toUpdate.save();
    }
    res.status(200).send("user updated");
  }
  res.status(200).send("error");
}
//Delete single Posts
async function deletePostHandler(req, res) {
  let communityId = parseInt(req.params.id);
  let postId = parseInt(req.params.postId);

  let fetchedPost = await database.posts.findOne({ where: { id: postId } });
  if (fetchedPost) {
    if (fetchedPost.author === req.user.id) {
      await database.posts.destroy({ where: { id: postId } });
      res.status(201).send("deleted successfully");
    } else {
      res
        .status(204)
        .send(`You can't delete this post because you aren't the author `);
    }
  } else {
    res.status(500).send(`the  post id ${pid} isn\'t exist`);
  }
}

//Get All Posts from a single user from all communities
async function getPostsFromUserHandler(req, res) {
  let userId = parseInt(req.params.id);

  let fetchedPosts = await database.posts.findAll({
    where: { author: userId },
  });
  let output = fetchedPosts.map((ele) => {
    let output = {
      id: ele.id,
      title: ele.post_title,
      body: ele.post_body,
      createdAt: ele.createdAt,
    };
    return output;
  });
  if (fetchedPosts) {
    res.status(200).json(output);
  } else {
    res.status(500).send(`you do not have any posts`);
  }
}

//Get All Posts from a single user from a single community
async function getUserPostsFromCommunity(req, res) {
  let uid = parseInt(req.params.id);
  let cid = parseInt(req.params.cid);
  let fetchedPosts = await database.posts.findAll({
    where: { author: uid, community_id: cid },
  });
  let output = fetchedPosts.map((ele) => {
    let output = {
      id: ele.id,
      title: ele.post_title,
      body: ele.post_body,
      createdAt: ele.createdAt,
    };
    return output;
  });
  if (fetchedPosts) {
    res.status(200).json(output);
  } else {
    res.status(500).send(`something went wrong`);
  }
}

//Get All Posts from a single community
async function getPostsFromCommunityHandler(req, res) {
  let communityId = parseInt(req.params.id);
  let fetchedPosts = await database.posts.findAll({
    where: { community_id: communityId },
  });
  let output = fetchedPosts.map((ele) => {
    let output = {
      id: ele.id,
      title: ele.post_title,
      body: ele.post_body,
      author: ele.author,
      createdAt: ele.createdAt,
    };
    return output;
  });
  if (fetchedPosts) {
    res.status(200).json(output);
  } else {
    res.status(500).send(`the community_id ${cid} isn\'t exist`);
  }
}

module.exports = router;
