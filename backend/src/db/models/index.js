"use strict";
require("dotenv").config();
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

db.users.hasMany(db.communities ,{foreignKey: 'user_id' ,sourceKey :'id'});
db.communities.belongsTo(db.users,{foreignKey: 'user_id' ,targetKey :'id'});

db.users.hasMany(db.posts ,{foreignKey: 'author' ,sourceKey :'id'});
db.posts.belongsTo(db.users,{foreignKey: 'author' ,targetKey :'id'});

db.users.hasMany(db.moderators ,{foreignKey: 'user_id' ,sourceKey :'id'});
db.moderators.belongsTo(db.users ,{foreignKey: 'user_id' ,targetKey :'id'});

db.communities.hasMany(db.posts,{foreignKey: 'community_id' ,sourceKey :'id'});
db.posts.belongsTo(db.communities,{foreignKey: 'community_id' ,targetKey :'id'});

//  db.moderators.hasMany(db.communities, { foreginKey: "community_id",sourceKey :'id' });
//  db.communities.belongsTo(db.moderators,{foreignKey: 'community_id' ,targetKey :'id'});

//  db.moderators.hasMany(db.users, { foreginKey: "user_id",sourceKey :'id' });
//  db.users.belongsTo(db.moderators,{foreignKey: 'user_id' ,targetKey :'id'});


db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
