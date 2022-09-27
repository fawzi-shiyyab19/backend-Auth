'use strict';

const { Sequelize, DataTypes } = require('sequelize');
const { createPostModel } = require('./post.model');
const { createCommentModel } = require('./comment.model');
const { createUserModel } = require('./user.model');

require('dotenv').config();



const POSTGRS_URL = process.env.DATABASE_URL;

const sequelizeOption = {
  dialectOptions: {
    ssl: {
      require: false,
      rejectUnauthorized: false,
    },
  },
};
const sequelize = new Sequelize(POSTGRS_URL, sequelizeOption);

sequelize
  .authenticate()
  .then(() => {
    console.log("Database connected to postgres DBMS");
  })
  .catch((err) => {
    console.log(err);
  });


const postModel = createPostModel(sequelize, DataTypes);
const commentModel = createCommentModel(sequelize, DataTypes);
const userModel = createUserModel(sequelize, DataTypes);

postModel.hasMany(commentModel, { foreignKey: "postId", sourceKey: "id" });
commentModel.belongsTo(postModel, { foreignKey: "postId", targetKey: "id" });

userModel.hasMany(commentModel, { foreignKey: "userId", sourceKey: "id" });
commentModel.belongsTo(userModel, { foreignKey: "userId", targetKey: "id" });







module.exports = { sequelize, postModel, commentModel, userModel };