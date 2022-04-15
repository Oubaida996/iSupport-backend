"use strict";
const express = require("express");
const userRouter = require("../src/routes/users");
const communityRouter = require("../src/routes/communityRoutes");
const communitiesRouter = require("../src/routes/communitiesRoute");
const postsRouter = require("../src/routes/posts");
const liveChat = require("./routes/live-chat.route");
const path = require("path");
require("./chat-app/server");

// const notFoundHandler = require("./middleware/404");
// const errorHandler = require("./middleware/500");
const authRoute = require("./routes/leaderborad");
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
app.use(express.static(__dirname + "/public/"));
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("server is up and running");
});

//router
app.use(userRouter);
app.use(communityRouter);
app.use(communitiesRouter);
app.use(postsRouter);
app.use(liveChat);

// app.use(authRoute);

// app.use("*", notFoundHandler);
// app.use(errorHandler);

module.exports = {
  app: app,
  start: start,
};
