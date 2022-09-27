'use strict';



function createPostModel(sequelize, DataTypes) {
  return (sequelize.define(`post`, {
    title: { type: DataTypes.STRING, allowNull: false },
    content: { type: DataTypes.STRING, allowNull: false },
  }));
}



module.exports = { createPostModel };