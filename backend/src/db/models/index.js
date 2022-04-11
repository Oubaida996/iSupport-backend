"use strict";
require('dotenv').config();
const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const users = require("./users");
const basename = path.basename(__filename);
const POSTGRES_URI = 
  process.env.NODE_ENV === "test" ? "sqlite:memory:" : process.env.DATABASE_URL;

let sequelizeOptions =
  process.env.NODE_ENV === "production"
    ? {
        dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
        },
      }
    : {};
const db = {};

let sequelize = new Sequelize(POSTGRES_URI, sequelizeOptions);

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.users.hasMany(db.posts);
db.posts.belongsTo(db.users);
db.users.hasMany(db.moderators);
db.moderators.belongsTo(db.users);
db.communities.hasMany(db.posts);
db.posts.belongsTo(db.communities);
db.communities.hasMany(db.moderators);
db.moderators.belongsTo(db.communities);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
