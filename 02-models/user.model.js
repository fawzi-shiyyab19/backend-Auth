'use strict';

function createUserModel(sequelize, DataTypes) {
  return (
    sequelize.define('user', {
      username: { type: DataTypes.STRING, allowNull: false, unique: true },
      email: { type: DataTypes.STRING, allowNull: false, unique: true },
      password: { type: DataTypes.STRING, allowNull: false },
      role: { type: DataTypes.ENUM('user', 'admin'), defaultValue: 'user', allowNull: false },
      token: { type: DataTypes.VIRTUAL },
      capabilites: {
        type: DataTypes.VIRTUAL,
        get() {
          const actions = {
            user: ['read', 'create'],
            admin: ['read', 'create', 'update', 'delete'],
          }
          return (actions[this.role]);
        }
      }
    })
  );
}



module.exports = { createUserModel };