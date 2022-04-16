"use strict";
const express = require("express");
const userRouter = require("../src/routes/users");
const communityRouter = require("../src/routes/communityRoutes");
const communitiesRouter = require("../src/routes/communitiesRoute");
const postsRouter = require("../src/routes/posts");
// const leaderBordRouter =require('../src/routes/leaderborad');
const authRouter = require("../src/routes/auth.routes");
const searchRouter = require("../src/routes/searchRoute");
const communitiesListRouter = require("../src/routes/communitiesList");
const liveChat = require("./routes/live-chat.route");
const videoChat = require("./routes/video-chat.route");
const leaderboardRoute = require("./routes/leaderborad");
const personalProgress = require("./routes/personalProgress");
const joinCommunity = require("./routes/joinCommunity.route");
require("./chat-app/server");
require("./video-chat-app/server");
// const notFoundHandler = require("./middleware/404");
// const errorHandler = require("./middleware/500");
const cors = require("cors");
// express app
const app = express();
app.use(cors());

// connect to sequelize & listen for requests
const start = (port) => {
  app.listen(port, () => console.log(`Running on Port ${port}`));
};

// middleware & static files
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname));
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("server is up and running");
});

//router
app.use(userRouter);
app.use(communityRouter);
app.use(communitiesRouter);
app.use(joinCommunity);
app.use(postsRouter);
app.use(leaderboardRoute);
app.use(authRouter);
app.use(searchRouter);
app.use(communitiesListRouter);
app.use(liveChat);
app.use(videoChat);
app.use(personalProgress);

// app.use("*", notFoundHandler);
// app.use(errorHandler);

module.exports = {
  app: app,
  start: start,
};
